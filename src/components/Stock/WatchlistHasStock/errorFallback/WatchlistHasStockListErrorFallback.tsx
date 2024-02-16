import { ErrorFallbackContent } from "@components/common/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function WatchlistHasStockListError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledWatchlistHasStockListError>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledWatchlistHasStockListError>
  );
}

const StyledWatchlistHasStockListError = styled.div`
  width: 100%;
  max-height: 160px;
`;
