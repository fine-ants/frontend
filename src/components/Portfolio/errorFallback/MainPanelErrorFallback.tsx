import { ErrorFallbackContent } from "@components/common/ErrorFallbackContent";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function MainPanelErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledMainPanelErrorFallback>
      <ErrorFallbackContent
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    </StyledMainPanelErrorFallback>
  );
}

const StyledMainPanelErrorFallback = styled.div`
  width: 960px;
  height: 1060px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  color: ${({ theme: { color } }) => color.neutral.gray900};
`;
