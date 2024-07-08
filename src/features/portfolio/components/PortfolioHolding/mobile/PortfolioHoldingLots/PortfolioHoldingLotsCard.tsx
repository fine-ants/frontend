import ConfirmAlert from "@components/ConfirmAlert";
import usePortfolioHoldingPurchaseDeleteMutation from "@features/portfolio/api/queries/usePortfolioHoldingPurchaseDeleteMutation";
import { PurchaseHistory } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingAddOrEditLots from "./PortfolioHoldingAddOrEditLots";
import PortfolioHoldingLots from "./PortfolioHoldingLots";

type Props = {
  portfolioHoldingId: number;
  lot: PurchaseHistory;
};

export default function PortfolioHoldingLotsCard({
  portfolioHoldingId,
  lot,
}: Props) {
  const { portfolioId } = useParams();

  const { mutate: portfolioHoldingPurchaseDeleteMutate } =
    usePortfolioHoldingPurchaseDeleteMutation(Number(portfolioId));

  const {
    state: isEditing,
    setTrue: onEdit,
    setFalse: onEditCancel,
  } = useBoolean();
  const {
    state: isDeleteConfirmAlertOpen,
    setTrue: onDeleteConfirmAlertOpen,
    setFalse: onDeleteConfirmAlertClose,
  } = useBoolean();

  const onDeleteConfirm = () => {
    portfolioHoldingPurchaseDeleteMutate({
      portfolioId: Number(portfolioId),
      portfolioHoldingId,
      purchaseHistoryId: lot.purchaseHistoryId,
    });
  };

  return (
    <>
      <div>
        <StyledPortfolioHoldingLotsCard>
          {isEditing ? (
            <PortfolioHoldingAddOrEditLots
              lot={lot}
              portfolioHoldingId={portfolioHoldingId}
              onClose={onEditCancel}
              onDeleteConfirmAlertOpen={onDeleteConfirmAlertOpen}
            />
          ) : (
            <PortfolioHoldingLots
              lot={lot}
              onEdit={onEdit}
              onDeleteConfirmAlertOpen={onDeleteConfirmAlertOpen}
            />
          )}
        </StyledPortfolioHoldingLotsCard>

        <StyledDivider />
      </div>

      <ConfirmAlert
        isOpen={isDeleteConfirmAlertOpen}
        title="매입 이력을 삭제하시겠습니까?"
        onClose={onDeleteConfirmAlertClose}
        onConfirm={onDeleteConfirm}
      />
    </>
  );
}

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
