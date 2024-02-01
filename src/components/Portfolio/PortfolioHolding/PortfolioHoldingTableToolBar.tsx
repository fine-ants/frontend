import usePortfolioHoldingDeleteMutation from "@api/portfolio/queries/usePortfolioHoldingDeleteMutation";
import { PortfolioHolding } from "@api/portfolio/types";
import dividerIcon from "@assets/icons/ic_divider.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingAddDialog from "./PortfolioHoldingAddDialog";

type Props = {
  selected: readonly PortfolioHolding[];
};

export default function PortfolioHoldingTableToolBar({ selected }: Props) {
  const { portfolioId } = useParams();

  const { mutate: portfolioHoldingDeleteMutate } =
    usePortfolioHoldingDeleteMutation(Number(portfolioId));

  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onAddPortfolioButtonClick = () => {
    setIsAddHoldingDialogOpen(true);
  };

  const onAddHoldingDialogClose = () => {
    setIsAddHoldingDialogOpen(false);
  };

  const onDeleteHoldingsButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeleteHoldingsAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    const selectedHoldingIds = selected.map((item) => item.portfolioHoldingId);
    portfolioHoldingDeleteMutate({
      portfolioId: Number(portfolioId),
      body: { portfolioHoldingIds: selectedHoldingIds },
    });
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

            <img src={dividerIcon} alt="" />

            <Tooltip title="종목 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeleteHoldingsButtonClick}>
                <img src={trashIcon} alt="선택된 종목 삭제" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <Button variant="primary" size="h32" onClick={onAddPortfolioButtonClick}>
        <Icon icon="add" size={16} color="white" />
        <span>종목 추가</span>
      </Button>

      {isAddHoldingDialogOpen && (
        <PortfolioHoldingAddDialog
          isOpen={isAddHoldingDialogOpen}
          onClose={onAddHoldingDialogClose}
        />
      )}

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="선택된 종목을 삭제 하시겠습니까?"
          onClose={onDeleteHoldingsAlertClose}
          onConfirm={onConfirmAction}>
          <DeleteList>
            {selected.map((item) => (
              <DeleteListItem key={item.portfolioHoldingId}>
                {item.companyName}
              </DeleteListItem>
            ))}
          </DeleteList>
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

const DeleteList = styled.ul`
  width: 100%;
  height: inherit;
  max-height: inherit;
  overflow-y: scroll;
`;

const DeleteListItem = styled.li``;
