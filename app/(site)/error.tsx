"use client";

import { type ErrorBoundaryProps, useErrorHeading } from "@/app/use-error-heading";

import { PageIntro, PageTitle } from "./poster";

const RouteError = ({ error, retry }: ErrorBoundaryProps) => {
  const headingRef = useErrorHeading(error);

  return (
    <>
      <PageTitle ref={headingRef} tabIndex={-1}>
        Something went wrong
      </PageTitle>
      <PageIntro>
        <p>
          This page failed to load.{" "}
          <button className="link-draw cursor-pointer" onClick={retry} type="button">
            Try again
          </button>
        </p>
        {error.digest !== undefined && (
          <p className="text-xs leading-6 tracking-widest">Reference: {error.digest}</p>
        )}
      </PageIntro>
    </>
  );
};

export default RouteError;
