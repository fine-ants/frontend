import { Button } from "@mui/material";
import { FallbackProps } from "react-error-boundary";
import styled from "styled-components";

export function ErrorFallbackContent({ resetErrorBoundary }: FallbackProps) {
  return (
    <StyledErrorFallbackContent>
      <Title>서버로부터 데이터를 불러오지 못했습니다.</Title>
      <Content>새로고침을 하거나 잠시 후 다시 시도해 주세요.</Content>
      <Button variant="contained" onClick={resetErrorBoundary}>
        새로고침
      </Button>
    </StyledErrorFallbackContent>
  );
}

const StyledErrorFallbackContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 29px;
`;
