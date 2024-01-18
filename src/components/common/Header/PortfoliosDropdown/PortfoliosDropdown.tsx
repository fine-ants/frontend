import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { useDropdown } from "@components/hooks/useDropdown";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../Icon";
import PortfoliosDropdownList from "./PortfoliosDropdownList";
import PortfoliosDropdownListErrorFallback from "./PortfoliosDropdownListErrorFallback";
import PorfoliosDropdownListSkeleton from "./PortfoliosDropdownListSkeleton";

export function PortfoliosDropdown() {
  const navigate = useNavigate();

  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const [isPortfolioAddDialogOpen, setIsPortfolioAddDialogOpen] =
    useState(false);

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  const onPortfolioAddClick = () => {
    setIsPortfolioAddDialogOpen(true);
  };

  return (
    <>
      <DropdownButton onClick={onDropdownButtonClick} $isOpen={isOpen}>
        <span>Portfolios</span>
        <Icon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color={isOpen ? "white" : "gray400"}
        />
      </DropdownButton>
      <DropdownMenu sx={dropdownMenuSx}>
        <AsyncBoundary
          SuspenseFallback={<PorfoliosDropdownListSkeleton />}
          ErrorFallback={PortfoliosDropdownListErrorFallback}>
          <PortfoliosDropdownList DropdownItem={DropdownItem} />
        </AsyncBoundary>

        <DropdownItem
          sx={fixedDropdownItemSx}
          onClick={() => navigate(Routes.PORTFOLIOS)}>
          포트폴리오로 이동
        </DropdownItem>
        <DropdownItem sx={fixedDropdownItemSx} onClick={onPortfolioAddClick}>
          포트폴리오 추가
        </DropdownItem>
      </DropdownMenu>

      {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={() => setIsPortfolioAddDialogOpen(false)}
        />
      )}
    </>
  );
}

const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font: ${designSystem.font.title4};
  color: ${({ $isOpen }) => ($isOpen ? "white" : "gray400")};
  letter-spacing: -0.02em;
  cursor: pointer;

  &:hover {
    color: ${designSystem.color.neutral.white};

    > .icon {
      background-color: ${designSystem.color.neutral.white};
    }
  }
`;

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "240px",
    "maxHeight": "265px",
    "padding": "8px",
    "overflowY": "scroll",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",

      ".MuiMenuItem-root": {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        whiteSpace: "nowrap",
        overflowX: "hidden",
        textOverflow: "ellipsis",
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const fixedDropdownItemSx = {
  font: designSystem.font.body2,
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};
