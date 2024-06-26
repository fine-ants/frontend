import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import { Order } from "@components/Table/types";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { StockNotification } from "src/features/notification/api/types";
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
            icon={isAllRowsOpen ? "chevron-down" : "chevron-right"}
            iconColor="custom"
            size="h24"
            customColor={{ color: "gray400", hoverColor: "gray100" }}
            onClick={(event) => onExpandOrCollapseAllRows(event)}
          />
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

              return isOrderBy ? (
                <Icon
                  icon={order === "asc" ? "sort_ascending" : "sort_descending"}
                  size={16}
                  color="#373840"
                />
              ) : (
                <Icon icon="sort_none" size={16} color="gray600" />
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
