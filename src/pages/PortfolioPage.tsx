import useStompSubscription from "@api/hooks/useStompSubWithRQ";
import { Portfolio } from "@api/portfolio";
import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import plusIcon from "@assets/icons/plus.svg";
import DividendBarChart from "@components/Portfolio/DividendBarChart";
import HoldingsPieChart from "@components/Portfolio/HoldingsPieChart";
import PortfolioHoldingAddModal from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingAddModal";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import SectorBar from "@components/Portfolio/SectorBar";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { BASE_API_URL_WS } from "@constants/config";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  const { data: portfolio, isLoading: isPortfolioDetailsLoading } =
    usePortfolioDetailsQuery(Number(id));

  const [isAddHoldingModalOpen, setIsAddHoldingModalOpen] = useState(false);

  const { onConnect } = useStompSubscription<Portfolio>({
    brokerURL: `${BASE_API_URL_WS}/portfolio`,
    subscribeURL: `portfolio/${id}`,
    queryKey: useMemo(() => ["portfolio", Number(id)], [id]),
    updaterFn: useCallback((_, newData) => newData, []),
    initialMsg: useMemo(
      () => ({
        tickerSymbols: portfolio?.portfolioHoldings.map(
          (holding) => holding.tickerSymbol
        ),
      }),
      [portfolio]
    ),
  });

  useEffect(() => {
    if (portfolio) {
      onConnect();
    }
  }, [portfolio, onConnect]);

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingModalOpen(true);
  };

  // TODO: Handle loading
  if (isPortfolioDetailsLoading) {
    return <div>Loading</div>;
  }

  // TODO: Handle error
  if (!portfolio) {
    return <div>Error</div>;
  }

  const { portfolioDetails, portfolioHoldings } = portfolio;

  return (
    <StyledPortfolioPage>
      <Header />

      <main style={{ display: "flex", padding: "40px 150px", gap: "32px" }}>
        <LeftPanel>
          <HoldingsPieChart data={portfolioHoldings} />
          <DividendBarChart />
          <SectorBar />
        </LeftPanel>

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
      </main>

      <Footer />

      <PortfolioHoldingAddModal
        portfolioId={Number(id)}
        isOpen={isAddHoldingModalOpen}
        onClose={() => setIsAddHoldingModalOpen(false)}
      />
    </StyledPortfolioPage>
  );
}

const StyledPortfolioPage = styled(BasePage)``;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
