import { useSSE } from "@api/hooks/useSSE";
import { Portfolio } from "@api/portfolio/types";
import plusIcon from "@assets/icons/plus.svg";
import PortfolioHoldingAddDialog from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingAddDialog";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import { Box, Button, Typography } from "@mui/material";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChartsPanel from "../../components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "../../components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  const {
    data: portfolio,
    isLoading,
    isError,
  } = useSSE<Portfolio>({
    url: `/api/portfolio/${id}/holdings/realtime`,
    eventTypeName: "portfolioDetails",
  });

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  // TODO: Handle loading
  if (isLoading) {
    return <div>Loading</div>;
  }

  // TODO: Handle error
  if (isError) {
    return <div>Error</div>;
  }

  const { portfolioDetails, portfolioHoldings } = portfolio!;

  return (
    <BasePage>
      <Container>
        <Suspense fallback={<ChartsPanelSkeleton />}>
          <ChartsPanel portfolioId={Number(id)} />
        </Suspense>

        <RightPanel>
          <PortfolioOverviewContainer>
            <PortfolioOverview data={portfolioDetails} />
          </PortfolioOverviewContainer>

          <PortfolioHoldingsContainer>
            <header>
              <Typography variant="h6" component="h3">
                종목 목록
              </Typography>

              <AddHoldingButton
                variant="outlined"
                startIcon={<img src={plusIcon} alt="종목 추가" />}
                onClick={onAddHoldingButtonClick}>
                <Typography variant="button" sx={{ color: "#2C2C2E" }}>
                  종목 추가
                </Typography>
              </AddHoldingButton>
            </header>

            <PortfolioHoldingsTable
              portfolioId={portfolioDetails.id}
              data={portfolioHoldings}
            />
          </PortfolioHoldingsContainer>
        </RightPanel>
      </Container>

      <PortfolioHoldingAddDialog
        portfolioId={Number(id)}
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

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PortfolioOverviewContainer = styled.div``;

const PortfolioHoldingsContainer = styled(Box)`
  width: 988px;
  padding: 16px 24px 22px;
  box-shadow: 0px 0px 12px 0px #00000014;
  border-radius: 8px;
  background-color: #ffffff;

  header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }
`;

const AddHoldingButton = styled(Button)`
  border: 1px solid #8e8e93;
  border-radius: 8px;
`;
