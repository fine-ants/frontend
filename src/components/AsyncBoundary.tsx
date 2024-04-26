import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ComponentType, ReactNode, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type Props = {
  children: ReactNode;
  ErrorFallback: ComponentType<FallbackProps>;
  SuspenseFallback: ReactNode;
};

export function AsyncBoundary({
  children,
  ErrorFallback,
  SuspenseFallback,
}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={SuspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
