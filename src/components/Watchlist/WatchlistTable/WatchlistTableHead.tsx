import { WatchlistItemType } from "@api/watchlist";
import sortAscendingIcon from "@assets/icons/ic_sort_ascending.svg";
import sortDescendingIcon from "@assets/icons/ic_sort_descending.svg";
import sortNoneIcon from "@assets/icons/ic_sort_none.svg";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { CustomTooltip } from "@components/common/CustomTooltip";
import { Icon } from "@components/common/Icon";
import {
  Box,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  tableSortLabelClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ChangeEvent, MouseEvent } from "react";
import styled from "styled-components";
import { Order } from "./WatchlistTable";

type HeadCell = {
  id: keyof WatchlistItemType;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "companyName",
    numeric: false,
    label: "종목명",
  },
  {
    id: "currentPrice",
    numeric: true,
    label: "현재가",
  },
  {
    id: "dailyChangeRate",
    numeric: true,
    label: "변동률",
  },
  {
    id: "annualDividendYield",
    numeric: true,
    label: "배당률",
  },
  {
    id: "sector",
    numeric: true,
    label: "섹터",
  },
];

type Props = {
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof WatchlistItemType
  ) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function WatchlistTableHead({
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
}: Props) {
  const createSortHandler =
    (property: keyof WatchlistItemType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const onFavoriteIconClick = () => {
    //TODO: 삭제 뮤테이션
  };

  return (
    <StyledPortfolioListTableHead>
      <StyledTableRow>
        <StyledTableCell sx={{ width: "36px" }} padding="none">
          <CheckBox
            size="h20"
            checkType="indet"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all portfolios",
            }}
          />
        </StyledTableCell>
        <StyledTableCell padding="none" sx={{ width: "32px" }}>
          <CustomTooltip title="관심 종목 삭제" placement="bottom-start">
            <IconButton
              sx={{ padding: 0 }}
              disableRipple={true}
              onClick={onFavoriteIconClick}>
              <Icon icon="favorite" size={16} color="blue500" />
            </IconButton>
          </CustomTooltip>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            sx={{
              width: headCell.id === "companyName" ? "332px" : "240px",
            }}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() => {
                const isOrderBy = orderBy === headCell.id;

                if (!isOrderBy) return <img src={sortNoneIcon} />;

                if (order === "asc") {
                  return <img src={sortAscendingIcon} />;
                } else {
                  return <img src={sortDescendingIcon} />;
                }
              }}>
              {headCell.label}
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
    </StyledPortfolioListTableHead>
  );
}

const StyledPortfolioListTableHead = styled(TableHead)`
  height: 56px;
`;

const StyledTableRow = styled(TableRow)`
  height: 48px;
`;

const StyledTableCell = styled(TableCell)`
  height: 100%;
  padding: 0 8px;
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
  border: none;

  &:first-of-type {
    padding-left: 16px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-of-type {
    padding-right: 16px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  & > .${tableSortLabelClasses.root} {
    font: ${({ theme: { font } }) => font.title5.font};
    letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
  }
`;

const StyledTableSortLabel = styled(TableSortLabel)`
  flex-direction: row;
  gap: 4px;
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
