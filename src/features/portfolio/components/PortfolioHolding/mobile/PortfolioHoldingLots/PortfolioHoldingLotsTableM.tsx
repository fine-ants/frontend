import { TextButton } from "@components/Buttons/TextButton";
import { Icon } from "@components/Icon";
import { PurchaseHistory } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import PortfolioHoldingAddOrEditLots from "./PortfolioHoldingAddOrEditLots";
import PortfolioHoldingLotsCard from "./PortfolioHoldingLotsCard";

type Props = {
  portfolioHoldingId: number;
  purchaseHistory: PurchaseHistory[];
};

export default function PortfolioHoldingLotsTableM({
  portfolioHoldingId,
  purchaseHistory,
}: Props) {
  const {
    state: isOpenAddLots,
    setTrue: onAddLotsOpen,
    setFalse: onAddLotsClose,
  } = useBoolean();

  return (
    <StyledPortfolioHoldingLotsTable>
      {purchaseHistory.map((lot) => (
        <PortfolioHoldingLotsCard
          key={lot.purchaseHistoryId}
          portfolioHoldingId={portfolioHoldingId}
          lot={lot}
        />
      ))}

      {isOpenAddLots && (
        <>
          <StyledPortfolioHoldingLotsCard>
            <PortfolioHoldingAddOrEditLots
              portfolioHoldingId={portfolioHoldingId}
              onClose={onAddLotsClose}
            />
          </StyledPortfolioHoldingLotsCard>

          <StyledDivider />
        </>
      )}

      <ButtonWrapper>
        <TextButton size="h24" color="primary" onClick={onAddLotsOpen}>
          <Icon icon="add" size={16} color="blue500" />
          항목 추가
        </TextButton>
      </ButtonWrapper>
    </StyledPortfolioHoldingLotsTable>
  );
}

const StyledPortfolioHoldingLotsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  margin-left: auto;
`;

const StyledPortfolioHoldingLotsCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 16px;
  border-left: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledDivider = styled(Divider)`
  margin-top: 16px;
  border-color: ${designSystem.color.neutral.gray200};
`;
