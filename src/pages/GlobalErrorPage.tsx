import styled from "styled-components";

// TODO: Design
export default function GlobalErrorPage() {
  return (
    <StyledGlobalErrorPage>
      <Title>FineAnts Logo</Title>
      <Title>예기치 못한 에러가 발생했습니다</Title>
      <Content>새로고침을 하거나 잠시 후 다시 시도해 주세요.</Content>
    </StyledGlobalErrorPage>
  );
}

const StyledGlobalErrorPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  font: ${({ theme }) => theme.font.heading3.font};
  letter-spacing: ${({ theme }) => theme.font.heading3.letterSpacing};
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 29px;
`;
