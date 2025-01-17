"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const queryClient = new QueryClient();
export function Providers({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div {...props}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <>{children}</>
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
