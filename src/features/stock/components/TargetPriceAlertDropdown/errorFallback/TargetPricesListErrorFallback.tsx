import { Button } from "@mui/material";
import designSystem from "@styles/designSystem";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export default function TargetPricesListErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <StyledTargetPricesListErrorFallback>
      <Content>새로고침을 하거나 잠시 후 다시 시도해 주세요.</Content>
      <Button variant="contained" onClick={resetErrorBoundary}>
        새로고침
      </Button>
    </StyledTargetPricesListErrorFallback>
  );
}

const StyledTargetPricesListErrorFallback = styled.div`
  width: 100%;
  max-height: 90px;
  text-align: center;
`;

const Content = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 29px;
  color: ${designSystem.color.neutral.gray500};
`;
