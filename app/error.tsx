"use client";

import { useEffect, useRef } from "react";

type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RouteError = ({ error, reset }: RouteErrorProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    globalThis.reportError?.(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-semibold" ref={headingRef} tabIndex={-1}>
        Something went wrong
      </h1>
      <p className="max-w-md">The page could not be loaded. Please try again.</p>
      <button
        className="bg-primary-foreground text-primary rounded-lg px-4 py-3"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </main>
  );
};

export default RouteError;
