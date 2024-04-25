import {
  Pagination as MuiPagination,
  PaginationItem,
  paginationClasses,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

type Props = {
  count: number;
  page: number;
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
};

export default function Pagination({ count, page, onPageChange }: Props) {
  return (
    <StyledPagination
      count={count}
      page={page}
      onChange={(event: ChangeEvent<unknown>, newPage: number) => {
        onPageChange(event, newPage - 1);
      }}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: () => (
              <Icon icon="chevron-left" size={16} color="gray600" />
            ),
            next: () => <Icon icon="chevron-right" size={16} color="gray600" />,
          }}
          {...item}
        />
      )}
    />
  );
}

const StyledPagination = styled(MuiPagination)`
  height: 24px;

  .${paginationClasses.ul} {
    gap: 8px;

    > li {
      width: 24px;
      height: 24px;

      > button {
        width: 24px;
        min-width: 24px;
        height: 24px;
        margin: 0;
        padding: 0;

        &.Mui-selected {
          background-color: ${designSystem.color.primary.blue50};
          color: ${designSystem.color.primary.blue500};
        }

        &:hover {
          background-color: ${designSystem.color.neutral.gray50};
        }
      }
    }
  }
`;
