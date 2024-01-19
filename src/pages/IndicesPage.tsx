import TVIndicesWidget from "@components/TradingViewWidgets/TVIndicesWidget";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function IndicesPage() {
  return (
    <BasePage>
      <Main>
        <Container>
          <Title>인덱스</Title>
          <ChartContainer>
            <TVStockDetailWidget
              tickerSymbol="KOSPI"
              width={850}
              height={600}
            />
            <TVIndicesWidget />
          </ChartContainer>
        </Container>
      </Main>
    </BasePage>
  );
}

const Main = styled.main`
  padding: 48px;
  display: flex;
  gap: 16px;
`;

const Container = styled.div`
  width: 1440px;
  height: 796px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;

const ChartContainer = styled.div`
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;

const Title = styled.h1`
  font: ${designSystem.font.heading2.font};
`;
