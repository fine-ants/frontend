import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export function ChartErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledDashboardPieChart>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledDashboardPieChart>
  );
}

const StyledDashboardPieChart = styled.div`
  width: 50%;
  height: 480px;
  padding: 32px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  gap: 24px;
`;
