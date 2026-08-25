"use client";

import { useEffect, useRef } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const styles = {
  body: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    display: "flex",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    justifyContent: "center",
    margin: 0,
    minHeight: "100vh",
    padding: "1.5rem",
  },
  button: {
    backgroundColor: "#1a1a1a",
    border: "none",
    borderRadius: "0.5rem",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.875rem",
    minHeight: "2.75rem",
    padding: "0.625rem 1.25rem",
  },
  main: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: "28rem",
    textAlign: "center",
  },
} as const;

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    globalThis.reportError?.(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <html lang="en">
      <body style={styles.body}>
        <main style={styles.main}>
          <h1 ref={headingRef} tabIndex={-1}>
            Something went wrong
          </h1>
          <p>The site stopped unexpectedly. Please try again.</p>
          <button onClick={reset} style={styles.button} type="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
