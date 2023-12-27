import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import { OverviewErrorFallback } from "@components/Dashboard/errorFallback/OverviewErrorFallback";
import { DashboardOverviewSkeleton } from "@components/Dashboard/skeletons/DashboardOverviewSkeleton";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import PortfolioHoldingAddDialog from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingAddDialog";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import Button from "@components/common/Buttons/Button";
import { Box } from "@mui/material";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(id));

  const [selected, setSelected] = useState<readonly string[]>([]);

  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  // const {
  //   data: portfolioSSE,
  //   isLoading,
  //   isError,
  // } = useSSE<Portfolio>({
  //   url: `/api/portfolio/${id}/holdings/realtime`,
  //   eventTypeName: "portfolioDetails",
  // });

  // console.log(portfolioSSE);

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  // // TODO: Handle loading
  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

  // // TODO: Handle error
  // if (isError) {
  //   return <div>Error</div>;
  // }

  const { portfolioDetails, portfolioHoldings } = portfolio!;

  return (
    <BasePage>
      <Container>
        <LeftPanel>
          <PortfolioOverviewContainer>
            <AsyncBoundary
              ErrorFallback={OverviewErrorFallback}
              SuspenseFallback={<DashboardOverviewSkeleton />}>
              {/* //TODO data는 sse데이터,고정data 분리작업 필요 */}
              <PortfolioOverview data={portfolioDetails} />
            </AsyncBoundary>
          </PortfolioOverviewContainer>

          <PortfolioHoldingsContainer>
            <ButtonContainer>
              <SelectAndDeletePanel>
                <SelectedItemsCount>
                  <span>{selected.length}</span>개 선택됨
                </SelectedItemsCount>
                <VerticalDivider />
                <Button variant="tertiary" size="h32">
                  삭제
                </Button>
              </SelectAndDeletePanel>
              {/* 
              <AddHoldingButton
                variant="outlined"
                startIcon={<img src={addIcon} alt="종목 추가" />}
              /> */}
              <Button
                variant="primary"
                size="h32"
                onClick={onAddHoldingButtonClick}>
                종목 추가
              </Button>
            </ButtonContainer>
            <PortfolioHoldingsTable
              selected={selected}
              onClickCheckbox={setSelected}
              portfolioId={portfolioDetails.id}
              data={portfolioHoldings}
            />
          </PortfolioHoldingsContainer>
        </LeftPanel>

        <Suspense fallback={<ChartsPanelSkeleton />}>
          <ChartsPanel portfolioId={Number(id)} />
        </Suspense>
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

const LeftPanel = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 8px;
`;

const PortfolioOverviewContainer = styled.div`
  width: 100%;
`;

const PortfolioHoldingsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 896px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SelectAndDeletePanel = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

const SelectedItemsCount = styled.div`
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray600};

  > span {
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 12px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;
