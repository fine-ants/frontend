import ChartsPanelErrorFallback from "@components/Portfolio/Charts/errorFallback/ChartsPanelErrorFallback";
import MainPanelErrorFallback from "@components/Portfolio/errorFallback/MainPanelErrorFallback";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import MainPanel from "@components/Portfolio/MainPanel";
import MainPanelSkeleton from "@components/Portfolio/MainPanelSkeleton";
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
