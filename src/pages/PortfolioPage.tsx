import { AsyncBoundary } from "@components/AsyncBoundary";
import ChartsPanelErrorFallback from "@features/portfolio/components/Charts/errorFallback/ChartsPanelErrorFallback";
import ChartsPanel from "@features/portfolio/components/Portfolio/ChartPanel";
import MainPanel from "@features/portfolio/components/Portfolio/MainPanel";
import ChartsPanelSkeleton from "@features/portfolio/components/Portfolio/skeletons/ChartsPanelSkeleton";
import MainPanelSkeleton from "@features/portfolio/components/Portfolio/skeletons/MainPanelSkeleton";
import MainPanelErrorFallback from "@features/portfolio/components/errorFallback/MainPanelErrorFallback";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function PortfolioPage() {
  const { portfolioId } = useParams();

  const { isMobile } = useResponsiveLayout();

  const [tab, setTab] = useState<"portfolio" | "chart">("portfolio");

  const onChangeTab = (tab: "portfolio" | "chart") => {
    setTab(tab);
  };

  return (
    <BasePage key={portfolioId}>
      <Container $isMobile={isMobile}>
        <PanelWrapper $isVisible={isMobile ? tab === "portfolio" : true}>
          <AsyncBoundary
            ErrorFallback={MainPanelErrorFallback}
            SuspenseFallback={<MainPanelSkeleton />}>
            <MainPanel key={portfolioId} tab={tab} onChangeTab={onChangeTab} />
          </AsyncBoundary>
        </PanelWrapper>

        <PanelWrapper $isVisible={isMobile ? tab === "chart" : true}>
          <AsyncBoundary
            ErrorFallback={ChartsPanelErrorFallback}
            SuspenseFallback={<ChartsPanelSkeleton />}>
            <ChartsPanel tab={tab} onChangeTab={onChangeTab} />
          </AsyncBoundary>
        </PanelWrapper>
      </Container>
    </BasePage>
  );
}

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "colum" : "row")};
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "16px 0 32px 0px" : "40px 150px")};
  display: flex;
  align-items: flex-start;
  gap: ${({ $isMobile }) => ($isMobile ? "0px" : "32px")};
`;

const PanelWrapper = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
