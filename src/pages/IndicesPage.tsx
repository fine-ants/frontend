import Header from "@components/Header/Header";
import TVIndicesWidget from "@components/TradingViewWidgets/TVIndicesWidget";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function IndicesPage() {
  const { isMobile } = useResponsiveLayout();

  const { tickerSymbol } = useParams();

  if (!tickerSymbol) {
    return <Navigate to={Routes.FALLBACK} />;
  }

  return (
    <>
      <Header />
      <BasePage>
        <Main $isMobile={isMobile}>
          <LeftContainer $isMobile={isMobile}>
            <Title $isMobile={isMobile}>{tickerSymbol}</Title>
            <TVStockDetailWidget tickerSymbol={tickerSymbol} />
          </LeftContainer>
          <RightContainer $isMobile={isMobile}>
            <h2>인덱스</h2>
            <TVIndicesWidget />
          </RightContainer>
        </Main>
      </BasePage>
    </>
  );
}

const Main = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  gap: ${({ $isMobile }) => ($isMobile ? "0" : "16px")};
`;

const LeftContainer = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "1082px")};
  height: ${({ $isMobile }) => ($isMobile ? "100vh" : "796px")};
  padding: ${({ $isMobile }) => ($isMobile ? "32px 16px" : "35px")};
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const Title = styled.h1<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading3.font
      : designSystem.font.heading2.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading3.letterSpacing
      : designSystem.font.heading2.letterSpacing};
`;

const RightContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "342px")};
  height: ${({ $isMobile }) => ($isMobile ? "calc(100vh - 64px)" : "796px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0 16px" : "32px")};
  background-color: ${designSystem.color.neutral.white};

  > h2 {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading4.font
        : designSystem.font.heading3.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading4.letterSpacing
        : designSystem.font.heading3.letterSpacing};
  }
`;
