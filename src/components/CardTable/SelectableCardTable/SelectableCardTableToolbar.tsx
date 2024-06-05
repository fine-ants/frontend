import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import CheckBox from "@components/Checkbox";
import { Icon } from "@components/Icon";
import { Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  numSelected: number;
  isAllRowsSelectedInCurrentPage: boolean;
  openDeleteConfirm: () => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  openDrawer: () => void;
};

export function SelectableCardTableToolbar({
  numSelected,
  isAllRowsSelectedInCurrentPage,
  openDeleteConfirm,
  onSelectAllClick,
  openDrawer,
}: Props) {
  return (
    <>
      <Toolbar>
        <Controller>
          <CheckBox
            size="h20"
            onChange={onSelectAllClick}
            checked={isAllRowsSelectedInCurrentPage}
          />

          {numSelected > 0 && (
            <>
              <Typography
                sx={{ font: designSystem.font.body3.font }}
                color="inherit"
                variant="subtitle1"
                component="span">
                <span>{numSelected}</span>
                <span style={{ color: designSystem.color.neutral.gray600 }}>
                  개 선택됨
                </span>
              </Typography>
              <Icon icon="divider" size={12} color="gray100" />
              <Button variant="tertiary" size="h32" onClick={openDeleteConfirm}>
                <Icon icon="trash" size={16} color="gray600" />
                <span>삭제</span>
              </Button>
            </>
          )}
        </Controller>
        <TextButton size="h24" color="primary" onClick={openDrawer}>
          <Icon icon="ascending" size={16} color="blue500" />
          정렬
        </TextButton>
      </Toolbar>
    </>
  );
}

const Toolbar = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-top: 8px;
  justify-content: space-between;
`;

const Controller = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
