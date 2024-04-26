import Button from "@components/Buttons/Button";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import usePortfolioHoldingDeleteMutation from "@features/portfolio/api/queries/usePortfolioHoldingDeleteMutation";
import { PortfolioHolding } from "@features/portfolio/api/types";
import { Toolbar, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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

  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onAddPortfolioButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  const onAddHoldingDialogClose = useCallback(() => {
    setIsAddHoldingDialogOpen(false);
  }, [setIsAddHoldingDialogOpen]);

  const onDeleteHoldingsButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeleteHoldingsAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = async () => {
    const selectedHoldingIds = selected.map((item) => item.portfolioHoldingId);
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

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="선택 종목 삭제"
          onClose={onDeleteHoldingsAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            '
            {`${selected[0].companyName}'${
              selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
            } 종목을 삭제하시겠습니까?`}
          </span>
        </ConfirmAlert>
      )}
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