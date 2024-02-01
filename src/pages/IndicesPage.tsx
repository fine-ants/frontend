import TVIndicesWidget from "@components/TradingViewWidgets/TVIndicesWidget";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import Header from "@components/common/Header/Header";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function IndicesPage() {
  return (
    <>
      <Header />
      <BasePage>
        <Main>
          <LeftContainer>
            <Title>KOSPI</Title>
            <TVStockDetailWidget
              tickerSymbol="KRX:KOSPI"
              width={1018}
              height={601}
            />
          </LeftContainer>
          <RightContainer>
            <p>인덱스</p>
            <TVIndicesWidget width={278} height={679} />
          </RightContainer>
        </Main>
      </BasePage>
    </>
  );
}

const Main = styled.main`
  padding: 48px;
  display: flex;
  gap: 16px;
`;

const LeftContainer = styled.div`
  width: 1082px;
  height: 796px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const Title = styled.h1`
  font: ${designSystem.font.heading2.font};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 342px;
  height: 796px;
  padding: 32px;
  background-color: ${designSystem.color.neutral.white};

  > p {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
  }
`;
