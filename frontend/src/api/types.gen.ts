// This file is auto-generated by @hey-api/openapi-ts

export type UserDto = {
    id?: number;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
};

export type CreateUserDto = {
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
};

export type UserGetUsersData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/User';
};

export type UserGetUsersResponses = {
    200: Array<UserDto>;
};

export type UserGetUsersResponse = UserGetUsersResponses[keyof UserGetUsersResponses];

export type UserCreateUserData = {
    body: CreateUserDto;
    path?: never;
    query?: never;
    url: '/User';
};

export type UserCreateUserResponses = {
    200: Blob | File;
};

export type UserCreateUserResponse = UserCreateUserResponses[keyof UserCreateUserResponses];

export type UserDeleteUserData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/User/{id}';
};

export type UserDeleteUserResponses = {
    200: Blob | File;
};

export type UserDeleteUserResponse = UserDeleteUserResponses[keyof UserDeleteUserResponses];

export type UserGetUserData = {
    body?: never;
    path: {
        id: number;
    };
    query?: never;
    url: '/User/{id}';
};

export type UserGetUserResponses = {
    200: UserDto;
};

export type UserGetUserResponse = UserGetUserResponses[keyof UserGetUserResponses];

export type UserUpdateUserData = {
    body: CreateUserDto;
    path: {
        id: number;
    };
    query?: never;
    url: '/User/{id}';
};

export type UserUpdateUserResponses = {
    200: Blob | File;
};

export type UserUpdateUserResponse = UserUpdateUserResponses[keyof UserUpdateUserResponses];

export type ClientOptions = {
    baseUrl: 'http://localhost:5052' | (string & {});
};