import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import usePortfolioHoldingDeleteMutation from "@features/portfolio/api/queries/usePortfolioHoldingDeleteMutation";
import { PortfolioHolding } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import { Toolbar, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingDeleteConfirm from "../PortfolioHoldingDeleteConfirm";
import PortfolioHoldingAddDialog from "./PortfolioHoldingAddDialog";

type Props = {
  selected: readonly PortfolioHolding[];
  updateSelected: (newSelected: readonly PortfolioHolding[]) => void;
};

export default function PortfolioHoldingTableToolBar({
  selected,
  updateSelected,
}: Props) {
  const { portfolioId } = useParams();

  const { mutateAsync: portfolioHoldingDeleteMutateAsync } =
    usePortfolioHoldingDeleteMutation(Number(portfolioId));

  const {
    state: isAddHoldingDialogOpen,
    setTrue: onAddPortfolioButtonClick,
    setFalse: onAddHoldingDialogClose,
  } = useBoolean();
  const {
    state: isConfirmOpen,
    setTrue: onDeleteHoldingsButtonClick,
    setFalse: onDeleteHoldingsAlertClose,
  } = useBoolean();

  const onConfirmAction = async () => {
    const selectedHoldingIds = selected.map((item) => item.id);
    await portfolioHoldingDeleteMutateAsync({
      portfolioId: Number(portfolioId),
      body: { portfolioHoldingIds: selectedHoldingIds },
    });
    updateSelected([]);
  };

  return (
    <StyledToolbar>
      <SelectedInfoContainer>
        {selected.length > 0 && (
          <>
            <Typography
              sx={{ font: designSystem.font.body3.font }}
              color="inherit"
              variant="subtitle1"
              component="span">
              <span>{selected.length}</span>
              <span style={{ color: designSystem.color.neutral.gray600 }}>
                개 선택됨
              </span>
            </Typography>

            <Icon icon="divider" size={12} color="gray100" />

            <Button
              variant="tertiary"
              size="h32"
              onClick={onDeleteHoldingsButtonClick}>
              <Icon icon="trash" size={16} color="gray600" />
              <span>삭제</span>
            </Button>
          </>
        )}
      </SelectedInfoContainer>

      <Button variant="primary" size="h32" onClick={onAddPortfolioButtonClick}>
        <Icon icon="add" size={16} color="white" />
        <span>종목 추가</span>
      </Button>

      <PortfolioHoldingAddDialog
        isOpen={isAddHoldingDialogOpen}
        onClose={onAddHoldingDialogClose}
      />

      <PortfolioHoldingDeleteConfirm
        isOpen={isConfirmOpen}
        onClose={onDeleteHoldingsAlertClose}
        onConfirm={onConfirmAction}
        selected={selected}
      />
    </StyledToolbar>
  );
}

const StyledToolbar = styled(Toolbar)`
  height: 32px;
  min-height: 32px;
  padding: 0;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const SelectedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
