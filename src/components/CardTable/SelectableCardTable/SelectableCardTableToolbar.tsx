import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import CheckBox from "@components/Checkbox";
import { Icon } from "@components/Icon";
import { PortfolioItem } from "@features/portfolio/api/types";
import { Typography } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import styled from "styled-components";

type Props = {
  selected: readonly PortfolioItem[];
  isAllRowsSelectedInCurrentPage: boolean;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectableCardTableToolbar({
  selected,
  isAllRowsSelectedInCurrentPage,
  onSelectAllClick,
}: Props) {
  return (
    <Toolbar>
      <Controller>
        <CheckBox
          size="h20"
          onChange={onSelectAllClick}
          checked={isAllRowsSelectedInCurrentPage}
        />

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
            <Button variant="tertiary" size="h32" onClick={() => {}}>
              <Icon icon="trash" size={16} color="gray600" />
              <span>삭제</span>
            </Button>
          </>
        )}
      </Controller>
      <TextButton size="h24" color="primary">
        <Icon icon="ascending" size={16} color="blue500" />
        정렬
      </TextButton>
    </Toolbar>
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
