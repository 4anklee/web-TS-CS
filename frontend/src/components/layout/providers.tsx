'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 1000,
                retry: 1,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                {children}
            </HeroUIProvider>
        </QueryClientProvider>
    );
};