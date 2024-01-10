// import { useSSE } from "@api/hooks/useSSE";
// import { PortfolioSSE } from "@api/portfolio/types";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelErrorFallback from "@components/Portfolio/Charts/errorFallback/ChartsPanelErrorFallback";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import MainPanel from "@components/Portfolio/MainPanel";
import MainPanelSkeleton from "@components/Portfolio/MainPanelSkeleton";
import MainPanelErrorFallback from "@components/Portfolio/errorFallback/MainPanelErrorFallback";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  // const { portfolioId } = useParams();
  // const {
  //   data: portfolioSSE,
  //   isLoading,
  //   isError,
  // } = useSSE<PortfolioSSE>({
  //   url: `/api/portfolio/${portfolioId}/holdings/realtime`,
  //   eventTypeName: "portfolioDetails",
  // });

  return (
    <BasePage>
      <Container>
        <AsyncBoundary
          ErrorFallback={MainPanelErrorFallback}
          SuspenseFallback={<MainPanelSkeleton />}>
          <MainPanel />
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
  display: flex;
  padding: 40px 150px;
  gap: 32px;
`;
