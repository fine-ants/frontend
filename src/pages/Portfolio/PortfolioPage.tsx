import { OverviewErrorFallback } from "@components/Dashboard/errorFallback/OverviewErrorFallback";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import MainPanelSkeleton from "@components/Portfolio/Charts/skeletons/MainPanelSkeleton";
import MainPanel from "@components/Portfolio/MainPanel";
import PortfolioHoldingAddDialog from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingAddDialog";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { useState } from "react";
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

  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  return (
    <BasePage>
      <Container>
        <AsyncBoundary
          ErrorFallback={OverviewErrorFallback}
          SuspenseFallback={<MainPanelSkeleton />}>
          <MainPanel onAddHoldingButtonClick={onAddHoldingButtonClick} />
        </AsyncBoundary>

        <AsyncBoundary
          ErrorFallback={OverviewErrorFallback}
          SuspenseFallback={<ChartsPanelSkeleton />}>
          <ChartsPanel />
        </AsyncBoundary>
      </Container>

      <PortfolioHoldingAddDialog
        isOpen={isAddHoldingDialogOpen}
        onClose={() => setIsAddHoldingDialogOpen(false)}
      />
    </BasePage>
  );
}

const Container = styled.div`
  display: flex;
  padding: 40px 150px;
  gap: 32px;
`;
