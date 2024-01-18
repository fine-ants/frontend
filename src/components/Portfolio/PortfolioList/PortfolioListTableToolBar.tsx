import usePortfoliosDeleteMutation from "@api/portfolio/queries/usePortfoliosDeleteMutation";
import { PortfolioItem } from "@api/portfolio/types";
import dividerIcon from "@assets/icons/ic_divider.svg";
import addIcon from "@assets/icons/ic_folder-add.svg";
import trashIcon from "@assets/icons/ic_trash.svg";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import PortfolioAddDialog from "../PortfolioAddDialog";

interface PortfolioListTableToolBarProps {
  selected: readonly PortfolioItem[];
}

export default function PortfolioListTableToolBar({
  selected,
}: PortfolioListTableToolBarProps) {
  const { mutate: portfoliosDeleteMutate } = usePortfoliosDeleteMutation();

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
    const selectedPortfolioIds = selected.map((item) => item.id);
    portfoliosDeleteMutate(selectedPortfolioIds);
  };

  return (
    <StyledToolbar>
      <SelectedInfoContainer>
        {selected.length > 0 && (
          <>
            <Typography
              sx={{ font: designSystem.font.body3 }}
              color="inherit"
              variant="subtitle1"
              component="span">
              <span>{selected.length}</span>
              <span style={{ color: designSystem.color.neutral.gray600 }}>
                개 선택됨
              </span>
            </Typography>

            <img src={dividerIcon} alt="" />

            <Tooltip title="포트폴리오 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeletePortfoliosButtonClick}>
                <img src={trashIcon} alt="선택된 포트폴리오 삭제" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <Button variant="primary" size="h32" onClick={onAddPortfolioButtonClick}>
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
          title="선택된 포트폴리오를 삭제 하시겠습니까?"
          onClose={onDeletePortfoliosAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            {`${selected[0].name}${
              selected.length > 1 && ` 외 ${selected.length - 1}개`
            } 항목을 삭제하시겠습니까?`}
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
