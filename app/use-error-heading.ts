import { useEffect, useRef } from "react";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

const useErrorHeading = (error: Error) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    reportError(error);
    headingRef.current?.focus();
  }, [error]);

  return headingRef;
};

export { useErrorHeading };

export type { ErrorBoundaryProps };
