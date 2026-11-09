"use client";

import "./globals.css";

import { type ErrorBoundaryProps, useErrorHeading } from "./use-error-heading";

const GlobalError = ({ error, retry }: ErrorBoundaryProps) => {
  const headingRef = useErrorHeading(error);

  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center p-6">
        <title>Something went wrong</title>
        <main className="flex max-w-md flex-col items-center gap-6 text-center">
          <h1 className="text-2xl tracking-tight outline-none" ref={headingRef} tabIndex={-1}>
            Something went wrong
          </h1>
          <p className="text-sm leading-6">
            The site failed to load. Try again, or come back in a few minutes.
          </p>
          <button
            className="bg-foreground text-background min-h-11 cursor-pointer px-5 py-2.5 text-sm"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
          {error.digest !== undefined && (
            <p className="text-xs tracking-widest">Reference: {error.digest}</p>
          )}
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
