import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export function PortfolioListTableErrorFallback({
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
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
`;
