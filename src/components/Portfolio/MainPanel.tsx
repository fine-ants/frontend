import usePortfolioDetailsQuery from "@api/portfolio/queries/usePortfolioDetailsQuery";

import usePortfolioHoldingsDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingsDeleteMutation";
import noHoldingsStock from "@assets/images/no_holdings_stock.png";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingAddDialog from "./PortfolioHoldings/PortfolioHoldingAddDialog";
import PortfolioHoldingsTable from "./PortfolioHoldings/PortfolioHoldingsTable";
import PortfolioOverview from "./PortfolioOverview";

export default function MainPanel() {
  const { portfolioId } = useParams();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));
  const { portfolioDetails, portfolioHoldings } = portfolio;

  const { mutate: portfolioHoldingsDeleteMutate } =
    usePortfolioHoldingsDeleteMutation(portfolioDetails.id);

  const [selected, setSelected] = useState<readonly number[]>([]);
  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  const onDeleteHoldingButtonClick = () => {
    portfolioHoldingsDeleteMutate({
      portfolioId: portfolioDetails.id,
      body: { portfolioHoldingIds: selected },
    });
  };

  const onAddHoldingButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  const hasNoHoldings = portfolioHoldings.length === 0;
  return (
    <StyledMainPanel>
      <PortfolioOverviewContainer>
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

      <PortfolioHoldingAddDialog
        isOpen={isAddHoldingDialogOpen}
        onClose={() => setIsAddHoldingDialogOpen(false)}
      />
    </StyledMainPanel>
  );
}

const StyledMainPanel = styled.div`
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
  font: ${({ theme: { font } }) => font.body3.font};
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
  font: ${({ theme: { font } }) => font.title3.font};
  letter-spacing: ${({ theme: { font } }) => font.title3.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  > span {
    font: ${({ theme: { font } }) => font.body3.font};
    color: ${({ theme: { color } }) => color.neutral.gray500};
  }
`;
