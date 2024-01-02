import { OverviewErrorFallback } from "@components/Dashboard/errorFallback/OverviewErrorFallback";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import MainPanelSkeleton from "@components/Portfolio/MainPanelSkeleton";
import MainPanel from "@components/Portfolio/MainPanel";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  // const {
  //   data: portfolioSSE,
  //   isLoading,
  //   isError,
  // } = useSSE<PortfolioSSE>({
  //   url: `/api/portfolio/${id}/holdings/realtime`,
  //   eventTypeName: "portfolioDetails",
  // });

  return (
    <BasePage>
      <Container>
        <AsyncBoundary
          ErrorFallback={OverviewErrorFallback}
          SuspenseFallback={<MainPanelSkeleton />}>
          <MainPanel />
        </AsyncBoundary>

        <AsyncBoundary
          ErrorFallback={OverviewErrorFallback}
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
