import Button from "@components/Buttons/Button";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import usePortfoliosDeleteMutation from "@features/portfolio/api/queries/usePortfoliosDeleteMutation";
import { PortfolioItem } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import { Toolbar, Tooltip, Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import PortfolioAddDialog from "../../PortfolioAddOrEditDialog";

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

  const {
    state: isAddPortfolioDialogOpen,
    setTrue: onAddPortfolioButtonClick,
    setFalse: onAddPortfolioDialogClose,
  } = useBoolean();

  const {
    state: isDeleteConfirmOpen,
    setTrue: onDeletePortfoliosButtonClick,
    setFalse: onDeletePortfoliosAlertClose,
  } = useBoolean();

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

      {isDeleteConfirmOpen && (
        <ConfirmAlert
          isOpen={isDeleteConfirmOpen}
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
