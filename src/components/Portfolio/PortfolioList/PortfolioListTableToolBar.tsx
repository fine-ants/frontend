import addIcon from "@assets/icons/add-icon.svg";
import dividerIcon from "@assets/icons/ic_divider.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import PortfolioAddDialog from "../PortfolioAddDialog";

interface PortfolioListTableToolBarProps {
  numSelected: number;
}

export default function PortfolioListTableToolBar({
  numSelected,
}: PortfolioListTableToolBarProps) {
  const [isAddPortfolioDialogOpen, setIsAddPortfolioDialogOpen] =
    useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onAddPortfolioButtonClick = () => {
    setIsAddPortfolioDialogOpen(true);
  };

  const onAddPortfolioDialogClose = () => {
    setIsAddPortfolioDialogOpen(false);
  };

  const onDeletePortfoliosButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeletePortfoliosAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    // Request delete portfolios portfoliosDeleteMutate(selectedPortfolioIds);
  };

  return (
    <StyledToolbar>
      <SelectedInfoContainer>
        {numSelected > 0 && (
          <>
            <Typography
              sx={{ font: designSystem.font.body3 }}
              color="inherit"
              variant="subtitle1"
              component="span">
              <span>{numSelected}</span>
              <span style={{ color: designSystem.color.neutral.gray600 }}>
                개 선택됨
              </span>
            </Typography>

            <img src={dividerIcon} alt="" />

            <Tooltip title="Delete">
              <Button
                variant="tertiary"
                size={32}
                onClick={onDeletePortfoliosButtonClick}>
                <img src={trashIcon} alt="선택된 포트폴리오 삭제" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <Button variant="primary" size={32} onClick={onAddPortfolioButtonClick}>
        <img src={addIcon} alt="포트폴리오 추가" />
        <span>포트폴리오 추가</span>
      </Button>

      {isAddPortfolioDialogOpen && (
        <PortfolioAddDialog
          isOpen={isAddPortfolioDialogOpen}
          onClose={onAddPortfolioDialogClose}
        />
      )}

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="삭제"
          content="선택된 포트폴리오를 삭제 하시겠습니까?"
          onClose={onDeletePortfoliosAlertClose}
          onConfirm={onConfirmAction}
        />
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
