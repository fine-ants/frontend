import usePortfoliosDeleteMutation from "@api/portfolio/queries/usePortfoliosDeleteMutation";
import { PortfolioItem } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import PortfolioAddDialog from "../PortfolioAddOrEditDialog";

interface PortfolioListTableToolBarProps {
  selected: readonly PortfolioItem[];
  updateSelected: (newSelected: readonly PortfolioItem[]) => void;
}

export default function PortfolioListTableToolBar({
  selected,
  updateSelected,
}: PortfolioListTableToolBarProps) {
  const { mutateAsync: portfoliosDeleteMutateAsync } =
    usePortfoliosDeleteMutation();

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

  const onConfirmAction = async () => {
    const selectedPortfolioIds = selected.map((item) => item.id);
    await portfoliosDeleteMutateAsync(selectedPortfolioIds);
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

            <Tooltip title="포트폴리오 삭제">
              <Button
                variant="tertiary"
                size="h32"
                onClick={onDeletePortfoliosButtonClick}>
                <Icon icon="trash" size={16} color="gray600" />
                <span>삭제</span>
              </Button>
            </Tooltip>
          </>
        )}
      </SelectedInfoContainer>

      <Button variant="primary" size="h32" onClick={onAddPortfolioButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
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
          title="포트폴리오 삭제"
          onClose={onDeletePortfoliosAlertClose}
          onConfirm={onConfirmAction}>
          <span>
            '
            {`${selected[0].name}'${
              selected.length > 1 ? ` 외 ${selected.length - 1}개` : ""
            } 포트폴리오를 삭제하시겠습니까?`}
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
