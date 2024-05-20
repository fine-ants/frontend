import { AsyncBoundary } from "@components/AsyncBoundary";
import { Icon } from "@components/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import PortfolioAddDialog from "@features/portfolio/components/PortfolioAddOrEditDialog";
import { UserContext } from "@features/user/context/UserContext";
import { useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PortfoliosDropdownList from "./PortfoliosDropdownList";
import PortfoliosDropdownListErrorFallback from "./errorFallback/PortfoliosDropdownListErrorFallback";
import PortfoliosDropdownListSkeleton from "./skeletons/PortfoliosDropdownListSkeleton";

export function PortfoliosDropdown() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const {
    state: isPortfolioAddDialogOpen,
    setTrue: portfolioDialogOpen,
    setFalse: portfolioDialogClose,
  } = useBoolean();

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  const onPortfolioAddClick = () => {
    if (!user) {
      navigate(Routes.SIGNIN);
      return;
    }

    portfolioDialogOpen();
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
        {user && (
          <AsyncBoundary
            SuspenseFallback={<PortfoliosDropdownListSkeleton />}
            ErrorFallback={PortfoliosDropdownListErrorFallback}>
            <PortfoliosDropdownList DropdownItem={DropdownItem} />
          </AsyncBoundary>
        )}
        <Link to={user ? Routes.PORTFOLIOS : Routes.SIGNIN}>
          <DropdownItem sx={fixedDropdownItemSx}>
            포트폴리오로 이동
          </DropdownItem>
        </Link>
        <DropdownItem sx={fixedDropdownItemSx} onClick={onPortfolioAddClick}>
          포트폴리오 추가
        </DropdownItem>
      </DropdownMenu>

      {isPortfolioAddDialogOpen && (
        <PortfolioAddDialog
          isOpen={isPortfolioAddDialogOpen}
          onClose={portfolioDialogClose}
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
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${({ $isOpen }) =>
    $isOpen
      ? designSystem.color.neutral.white
      : designSystem.color.neutral.gray400};
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
  font: designSystem.font.body2.font,
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};
