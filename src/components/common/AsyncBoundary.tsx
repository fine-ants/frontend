import { ComponentType, ReactNode, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

type Props = {
  children: ReactNode;
  errorFallback: ComponentType<FallbackProps>;
  suspenseFallback: ReactNode;
};

export function AsyncBoundary({
  children,
  errorFallback,
  suspenseFallback,
}: Props) {
  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
