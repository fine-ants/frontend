import { StockNotification } from "@api/notifications/types";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import { Icon } from "@components/common/Icon";
import { Order } from "@components/common/Table/types";
import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  order: Order;
  orderBy: keyof StockNotification;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof StockNotification
  ) => void;
  isAllRowsOpen: boolean;
  onExpandOrCollapseAllRows: (event: MouseEvent) => void;
};

export default function StockNotificationListTableHead({
  order,
  orderBy,
  onRequestSort,
  isAllRowsOpen,
  onExpandOrCollapseAllRows,
}: Props) {
  const createSortHandler =
    (property: keyof StockNotification) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledStockNotificationListTableHead>
      <StyledTableRow>
        <StyledTableCell sx={{ width: "32px" }} padding="none">
          <IconButton
            style={{
              width: "16px",
              height: "16px",
              padding: "0",
            }}
            aria-label="expand row"
            size="small"
            onClick={(event) => onExpandOrCollapseAllRows(event)}>
            <Icon
              icon={isAllRowsOpen ? "chevron-down" : "chevron-right"}
              size={16}
              color={"gray400"}
            />
          </IconButton>
        </StyledTableCell>

        <StyledTableCell
          sx={{ width: "948px" }}
          align="left"
          sortDirection={orderBy === "companyName" ? order : false}>
          <StyledTableSortLabel
            active={orderBy === "companyName"}
            direction={orderBy === "companyName" ? order : "asc"}
            onClick={createSortHandler("companyName")}
            IconComponent={() => {
              const isOrderBy = orderBy === "companyName";

              if (!isOrderBy) return <img src={sortNoneIcon} />;

              return (
                <img
                  src={order === "asc" ? sortAscendingIcon : sortDescendingIcon}
                />
              );
            }}>
            종목 이름
            {orderBy === "companyName" && (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            )}
          </StyledTableSortLabel>
        </StyledTableCell>

        <StyledTableCell sx={{ width: "120px" }} align="center">
          <span>이전 종가</span>
        </StyledTableCell>

        <StyledTableCell sx={{ width: "120px" }} align="center">
          <span>지정가 알림</span>
        </StyledTableCell>

        <StyledTableCell sx={{ width: "120px" }} align="center">
          <span>지정가 알림 삭제</span>
        </StyledTableCell>
      </StyledTableRow>

      <TableRow sx={{ height: "8px" }} />
    </StyledStockNotificationListTableHead>
  );
}

const StyledStockNotificationListTableHead = styled(TableHead)`
  height: 56px;
`;

const StyledTableRow = styled(TableRow)`
  height: 48px;
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  background-color: ${designSystem.color.neutral.gray50};
  border: none;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};

  &:first-of-type {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-of-type {
    padding-right: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > span {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  flex-direction: row;
  gap: 4px;
`;
