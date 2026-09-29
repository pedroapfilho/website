"use client";

import { useEffect, useRef } from "react";

import styles from "./global-error.module.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

const GlobalError = ({ error, retry }: GlobalErrorProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    reportError(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <html className={styles.document} lang="en">
      <body className={styles.body}>
        <title>Something went wrong</title>
        <main className={styles.main} id="main-content">
          <h1 className={styles.heading} ref={headingRef} tabIndex={-1}>
            Something went wrong
          </h1>
          <p className={styles.text}>
            The site failed to load. Try again, or come back in a few minutes.
          </p>
          <button className={styles.button} onClick={retry} type="button">
            Try again
          </button>
          {error.digest !== undefined && <p className={styles.digest}>Reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
