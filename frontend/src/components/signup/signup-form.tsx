'use client'

import { Form, Input, Button, Link, Checkbox, Table, TableHeader, TableColumn, TableBody, getKeyValue, TableCell, TableRow } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateUserMutation, userGetUsersOptions } from "@/api/@tanstack/react-query.gen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateUserDto } from "@/api";

const zCreateUserDto = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const SignupForm = () => {
    const { mutateAsync: createUser } = useMutation({
        ...userCreateUserMutation(),
        onSuccess: () => {
            console.log("User created successfully");
        },
        onError: (error) => {
            console.error("something went wrong", error);
        }
    });

    const { data: users, isLoading: isUsersLoading, refetch: refetchUsers } = useQuery(userGetUsersOptions());

    const { handleSubmit, control, formState: { errors }, reset } = useForm<z.infer<typeof zCreateUserDto>>({
        resolver: zodResolver(zCreateUserDto),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: CreateUserDto) => {
        startTransition(async () => {
            console.log(data);
            await createUser({
                body: data,
            });
            refetchUsers();
            reset();
        });
    }

    const [isPending, startTransition] = useTransition();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const columns = [
        {
            key: "firstName",
            label: "First Name"
        },
        {
            key: "lastName",
            label: "Last Name"
        },
        {
            key: "username",
            label: "Username"
        },
        {
            key: "email",
            label: "Email"
        },
    ]

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    Sign Up
                    <span aria-label="emoji" className="ml-2" role="img">
                        👋
                    </span>
                </p>
                <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                isInvalid={!!errors.firstName}
                                label="First Name"
                                placeholder="Enter your first name"
                                type="text"
                                variant="bordered"
                                errorMessage={errors.firstName?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                isInvalid={!!errors.lastName}
                                label="Last Name"
                                placeholder="Enter your last name"
                                type="text"
                                variant="bordered"
                                errorMessage={errors.lastName?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                isInvalid={!!errors.username}
                                label="Username"
                                placeholder="Enter your username"
                                type="text"
                                variant="bordered"
                                errorMessage={errors.username?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                isInvalid={!!errors.email}
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                variant="bordered"
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input
                                {...field}
                                isRequired
                                isInvalid={!!errors.password}
                                endContent={
                                    <button type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <Icon
                                                className="pointer-events-none text-2xl text-default-400"
                                                icon="solar:eye-closed-linear"
                                            />
                                        ) : (
                                            <Icon
                                                className="pointer-events-none text-2xl text-default-400"
                                                icon="solar:eye-bold"
                                            />
                                        )}
                                    </button>
                                }
                                label="Password"
                                name="password"
                                placeholder="Enter your password"
                                type={isVisible ? "text" : "password"}
                                variant="bordered"
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Checkbox isRequired className="py-4" size="sm">
                        I agree with the&nbsp;
                        <Link href="#" size="sm">
                            Terms
                        </Link>
                        &nbsp; and&nbsp;
                        <Link href="#" size="sm">
                            Privacy Policy
                        </Link>
                    </Checkbox>
                    <Button color="primary" type="submit" fullWidth disabled={isPending || isUsersLoading}>
                        {isPending ? 'Signing up...' : 'Sign Up'}
                    </Button>
                </Form>
                <p className="text-center text-small">
                    <Link href="#" size="sm">
                        Already have an account? Log In
                    </Link>
                </p>
            </div>
            <Table
                aria-label="Users table"
                className="w-50"
                itemProp="users"
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users ?? []}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default SignupForm;
