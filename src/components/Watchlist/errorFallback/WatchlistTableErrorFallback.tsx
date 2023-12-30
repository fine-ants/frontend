import { ErrorFallbackContent } from "@components/common/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function WatchlistTableErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledWatchlistTableErrorFallback>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledWatchlistTableErrorFallback>
  );
}

const StyledWatchlistTableErrorFallback = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
`;
