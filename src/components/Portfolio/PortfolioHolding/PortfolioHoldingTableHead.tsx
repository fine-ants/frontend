import { PortfolioHolding } from "@api/portfolio/types";
import { IconButton } from "@components/common/Buttons/IconButton";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import { Order } from "@components/common/Table/types";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import designSystem from "@styles/designSystem";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof PortfolioHolding
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  isAllRowsOpen: boolean;
  onExpandOrCollapseAllRows: (event: MouseEvent) => void;
};

type HeadCell = {
  id: keyof PortfolioHolding;
  label: string;
  numeric: boolean;
  size: string;
};

const headCells: readonly HeadCell[] = [
  {
    id: "companyName",
    numeric: false,
    label: "종목명",
    size: "132px",
  },
  {
    id: "currentValuation",
    numeric: true,
    label: "평가 금액",
    size: "108px",
  },
  {
    id: "currentPrice",
    numeric: true,
    label: "현재가",
    size: "108px",
  },
  {
    id: "averageCostPerShare",
    numeric: true,
    label: "평균 매입가",
    size: "108px",
  },
  {
    id: "numShares",
    numeric: true,
    label: "개수",
    size: "64px",
  },
  {
    id: "dailyChangeRate",
    numeric: true,
    label: "변동률",
    size: "80px",
  },
  {
    id: "totalGain",
    numeric: true,
    label: "총 손익",
    size: "108px",
  },
  {
    id: "annualDividend",
    numeric: true,
    label: "연 배당금",
    size: "140px",
  },
];

export default function PortfolioHoldingTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
  isAllRowsOpen,
  onExpandOrCollapseAllRows,
}: Props) {
  const createSortHandler =
    (property: keyof PortfolioHolding) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledTableHead>
      <StyledTableRow
        style={{
          backgroundColor: designSystem.color.neutral.gray50,
        }}>
        <StyledTableCell sx={{ width: "32px" }} padding="none">
          <IconButton
            icon={isAllRowsOpen ? "chevron-down" : "chevron-right"}
            size="h24"
            iconColor="custom"
            customColor={{
              color: "gray400",
              hoverColor: "gray100",
            }}
            onClick={(event) => onExpandOrCollapseAllRows(event)}
          />
        </StyledTableCell>

        <StyledTableCell style={{ width: "32px" }}>
          <CheckBox
            size="h16"
            checkType="indet"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>

        {headCells.map((headCell, index) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            style={{
              width: headCell.size,
              borderRadius:
                index === headCells.length - 1 ? "0 8px 8px 0" : "0",
              padding:
                index === headCells.length - 1 ? "0 16px 0 8px" : "0 8px",
            }}
            sortDirection={orderBy === headCell.id ? order : false}>
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => {
                const isOrderBy = orderBy === headCell.id;

                return isOrderBy ? (
                  <Icon
                    icon={
                      order === "asc" ? "sort_ascending" : "sort_descending"
                    }
                    size={16}
                    color="#373840"
                  />
                ) : (
                  <Icon icon="sort_none" size={16} color="gray600" />
                );
              }}>
              {headCell.label === "연 배당금" ? (
                <CustomTooltip
                  title="해당 값은 예상 연 배당금으로 실제와 다를 수 있습니다."
                  placement="bottom-start"
                  arrow>
                  <StyledTooltipContainer>
                    {headCell.label}
                    <Icon icon="help" size={16} color="gray400" />
                  </StyledTooltipContainer>
                </CustomTooltip>
              ) : (
                <>{headCell.label}</>
              )}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>

      <TableRow sx={{ height: "8px" }} />
    </StyledTableHead>
  );
}

const StyledTableHead = styled(TableHead)`
  height: 48px;
  width: 100%;
  padding: 0 8px;
  background-color: ${designSystem.color.neutral.gray50};
  border-radius: 8px;

  & .MuiTableCell-root {
    border-bottom: none;
    color: ${designSystem.color.neutral.gray600};
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
  }
`;

const StyledTableRow = styled(TableRow)`
  width: 100%;
  background-color: #f6f6f8;

  & > last-child {
    border-radius: 0 8px 8px 0;
    padding: 0 16px 0 8px;
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 48px;
  padding: 4px 8px;

  &:first-of-type {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  > span {
    width: auto;
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  flex-direction: row;
  gap: 4px;
  color: ${designSystem.color.neutral.gray600};
`;

const StyledTooltipContainer = styled.div`
  display: flex;
  gap: 4px;
`;
