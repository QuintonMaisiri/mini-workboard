"use client";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function Provider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
       const initMocks = async () => {
          if (typeof window === 'undefined') {  
            const { server } = await import('@/lib/server');  
            server.listen();  
          } else {  
            const { worker } = await import('@/lib/browser');  
            worker.start();  
          }
       };
       initMocks();
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}