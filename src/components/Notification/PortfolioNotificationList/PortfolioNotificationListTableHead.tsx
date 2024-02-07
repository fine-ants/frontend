import { PortfolioNotification } from "@api/notifications/types";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
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
import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  order: Order;
  orderBy: keyof PortfolioNotification;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof PortfolioNotification
  ) => void;
};

export default function PortfolioNotificationListTableHead({
  order,
  orderBy,
  onRequestSort,
}: Props) {
  const createSortHandler =
    (property: keyof PortfolioNotification) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <StyledPortfolioNotificationListTableHead>
      <StyledTableRow>
        <StyledTableCell
          sx={{ width: "948px" }}
          align="left"
          sortDirection={orderBy === "name" ? order : false}>
          <StyledTableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
            IconComponent={() => {
              const isOrderBy = orderBy === "name";

              if (!isOrderBy) return <img src={sortNoneIcon} />;

              if (order === "asc") {
                return <img src={sortAscendingIcon} />;
              } else {
                return <img src={sortDescendingIcon} />;
              }
            }}>
            포트폴리오 이름
            {orderBy === "name" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </StyledTableSortLabel>
        </StyledTableCell>

        <StyledTableCell sx={{ width: "140px" }} align="center">
          <span>목표 수익률 도달 알림</span>
        </StyledTableCell>

        <StyledTableCell sx={{ width: "140px" }} align="center">
          <span>최대 손실율 도달 알림</span>
        </StyledTableCell>
      </StyledTableRow>

      <TableRow sx={{ height: "8px" }} />
    </StyledPortfolioNotificationListTableHead>
  );
}

const StyledPortfolioNotificationListTableHead = styled(TableHead)`
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
