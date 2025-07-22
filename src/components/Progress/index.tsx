"use client";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export function ProgressProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      height="25px"
      color="#f0ebda"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
