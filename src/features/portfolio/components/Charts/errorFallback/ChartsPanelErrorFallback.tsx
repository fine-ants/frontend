import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function ChartsPanelErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledChartsPanelErrorFallback>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledChartsPanelErrorFallback>
  );
}

const StyledChartsPanelErrorFallback = styled.div`
  width: 464px;
  height: 1060px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  color: ${({ theme: { color } }) => color.neutral.gray900};
`;
