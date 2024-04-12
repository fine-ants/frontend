import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelErrorFallback from "@components/Portfolio/Charts/errorFallback/ChartsPanelErrorFallback";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import MainPanel from "@components/Portfolio/MainPanel";
import MainPanelSkeleton from "@components/Portfolio/MainPanelSkeleton";
import MainPanelErrorFallback from "@components/Portfolio/errorFallback/MainPanelErrorFallback";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  const { portfolioId } = useParams();

  return (
    <BasePage>
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
