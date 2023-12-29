import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";
import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import noHoldingsStock from "@assets/images/no_holdings_stock.png";
import ChartsPanel from "@components/Portfolio/Charts/ChartsPanel";
import ChartsPanelSkeleton from "@components/Portfolio/Charts/skeletons/ChartsPanelSkeleton";
import PortfolioHoldingAddDialog from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingAddDialog";
import PortfolioHoldingsTable from "@components/Portfolio/PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "@components/Portfolio/PortfolioOverview";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Box } from "@mui/material";
import { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(id));
  const { portfolioDetails, portfolioHoldings } = portfolio!;
  // const {
  //   data: portfolioSSE,
  //   isLoading,
  //   isError,
  // } = useSSE<PortfolioSSE>({
  //   url: `/api/portfolio/${id}/holdings/realtime`,
  //   eventTypeName: "portfolioDetails",
  // });

  const { mutate: portfolioHoldingDeleteMutate } =
    usePortfolioHoldingDeleteMutation(portfolioDetails.id);

  const [selected, setSelected] = useState<readonly number[]>([]);
  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  const onDeleteHoldingButtonClick = () => {
    selected.forEach((holdingId) => {
      portfolioHoldingDeleteMutate({
        portfolioId: portfolioDetails.id,
        portfolioHoldingId: holdingId,
      });
    });
  };

  const hasNoHoldings = portfolioHoldings.length === 0;

  return (
    <BasePage>
      <Container>
        <LeftPanel>
          <PortfolioOverviewContainer>
            {/* //TODO data는 sse데이터,고정data 분리작업 필요 */}
            <PortfolioOverview data={portfolioDetails} />
          </PortfolioOverviewContainer>

          {hasNoHoldings ? (
            <NoHoldingsContainer>
              <img src={noHoldingsStock} alt="보유 종목 없음" />

              <TextBox>
                <div>종목을 추가하세요</div>
                <span>보유한 종목을 추가하여 포트폴리오 관리를 시작하세요</span>
              </TextBox>
              <Button
                variant="primary"
                size="h32"
                onClick={onAddHoldingButtonClick}>
                종목 추가
              </Button>
            </NoHoldingsContainer>
          ) : (
            <PortfolioHoldingsContainer>
              <ButtonContainer>
                <SelectAndDeletePanel>
                  <SelectedItemsCount>
                    <span>{selected.length}</span>개 선택됨
                  </SelectedItemsCount>
                  <VerticalDivider />
                  <Button
                    onClick={onDeleteHoldingButtonClick}
                    variant="tertiary"
                    size="h32">
                    삭제
                  </Button>
                </SelectAndDeletePanel>

                <Button
                  variant="primary"
                  size="h32"
                  onClick={onAddHoldingButtonClick}>
                  <Icon icon="add" size={16} color={"white"} />
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
          )}
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

const NoHoldingsContainer = styled.div`
  width: 100%;
  height: 318px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px dashed ${({ theme: { color } }) => color.primary.blue100};
  font: ${({ theme: { font } }) => font.title3};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  > span {
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray500};
  }
`;
