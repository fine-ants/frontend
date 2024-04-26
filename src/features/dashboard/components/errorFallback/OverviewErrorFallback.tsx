import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export function OverviewErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledDashboardOverview>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledDashboardOverview>
  );
}

const StyledDashboardOverview = styled.div`
  width: 100%;
  height: 316px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.gray800};
  color: ${({ theme: { color } }) => color.neutral.white};
`;
