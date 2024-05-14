import useResponsiveLayout from "@hooks/useResponsiveLayout";
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
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledPagination
      $isMobile={isMobile}
      count={count}
      page={page}
      onChange={(event: ChangeEvent<unknown>, newPage: number) => {
        if (page === newPage) return;

        if (isMobile) {
          window.scroll({ top: 0, behavior: "smooth" });
        }
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

const StyledPagination = styled(MuiPagination)<{ $isMobile: boolean }>`
  display: flex;
  justify-content: center;
  height: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};

  .${paginationClasses.ul} {
    gap: 8px;

    > li {
      width: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};
      height: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};

      > button {
        width: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};
        min-width: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};
        height: ${({ $isMobile }) => ($isMobile ? "32px" : "24px")};
        margin: 0;
        padding: 0;
        font: ${designSystem.font.body3.font};

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
