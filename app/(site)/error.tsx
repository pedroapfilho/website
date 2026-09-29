"use client";

import { useEffect, useRef } from "react";

type RouteErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

const RouteError = ({ error, retry }: RouteErrorProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    reportError(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <>
      <h1
        className="col-span-full mt-16 text-7xl leading-none tracking-tight text-balance outline-none sm:mt-24 sm:text-8xl lg:text-9xl"
        ref={headingRef}
        tabIndex={-1}
      >
        Something went wrong
      </h1>
      <div className="col-span-full mt-10 flex max-w-md flex-col gap-3 text-sm leading-6 text-pretty lg:col-start-5 lg:col-end-9 lg:mt-16">
        <p>
          This page failed to load.{" "}
          <button
            className="link-draw outline-ring cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
        </p>
        {error.digest !== undefined && (
          <p className="text-xs leading-6 tracking-widest">Reference: {error.digest}</p>
        )}
      </div>
    </>
  );
};

export default RouteError;
