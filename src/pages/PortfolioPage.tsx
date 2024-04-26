import { AsyncBoundary } from "@components/AsyncBoundary";
import ChartsPanel from "@features/portfolio/components/Charts/ChartsPanel";
import ChartsPanelErrorFallback from "@features/portfolio/components/Charts/errorFallback/ChartsPanelErrorFallback";
import ChartsPanelSkeleton from "@features/portfolio/components/Charts/skeletons/ChartsPanelSkeleton";
import MainPanel from "@features/portfolio/components/MainPanel";
import MainPanelSkeleton from "@features/portfolio/components/MainPanelSkeleton";
import MainPanelErrorFallback from "@features/portfolio/components/errorFallback/MainPanelErrorFallback";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function PortfolioPage() {
  const { portfolioId } = useParams();

  return (
    <BasePage key={portfolioId}>
      <Container>
        <AsyncBoundary
          ErrorFallback={MainPanelErrorFallback}
          SuspenseFallback={<MainPanelSkeleton />}>
          <MainPanel key={portfolioId} />
        </AsyncBoundary>

        <AsyncBoundary
          ErrorFallback={ChartsPanelErrorFallback}
          SuspenseFallback={<ChartsPanelSkeleton />}>
          <ChartsPanel />
        </AsyncBoundary>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  padding: 40px 150px;
  display: flex;
  align-items: flex-start;
  gap: 32px;
`;
