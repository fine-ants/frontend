import usePortfolioListHeaderQuery from "@api/portfolio/queries/usePortfolioListHeaderQuery";
import { useDropdown } from "@components/hooks/useDropdown";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "./Icon";

type Props = {
  portfolioDropdownItems:
    | {
        name: string;
        onClick: () => void;
      }[]
    | undefined;
  onPortfolioAddClick: () => void;
};

export function PortfoliosDropdown({
  portfolioDropdownItems,
  onPortfolioAddClick,
}: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, DropdownMenu, DropdownItem } = useDropdown();

  const { refetch: refetchPortfolioList } = usePortfolioListHeaderQuery();

  const onDropdownClick = (e: MouseEvent<HTMLButtonElement>) => {
    refetchPortfolioList();
    onOpen(e);
  };

  return (
    <>
      <DropdownButton onClick={onDropdownClick} $isOpen={isOpen}>
        <span>Portfolios</span>
        <Icon
          icon={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color={isOpen ? "white" : "gray400"}
        />
      </DropdownButton>
      <DropdownMenu sx={dropdownMenuSx}>
        {portfolioDropdownItems?.map((item) => (
          <DropdownItem
            key={item.name}
            sx={portfolioDropdownItemSx}
            onClick={item.onClick}>
            {item.name}
          </DropdownItem>
        ))}

        <Divider />

        <DropdownItem
          sx={fixedDropdownItemSx}
          onClick={() => navigate("/portfolios")}>
          포트폴리오로 이동
        </DropdownItem>
        <DropdownItem sx={fixedDropdownItemSx} onClick={onPortfolioAddClick}>
          포트폴리오 추가
        </DropdownItem>
      </DropdownMenu>
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
  font:${({ theme: { font } }) => font.title4.font}
  letter-spacing: ${({ theme: { font } }) => font.title4.letterSpacing};
  color: ${({ $isOpen }) => ($isOpen ? "white" : "gray400")};
  letter-spacing: -0.02em;
  cursor: pointer;

  &:hover {
    color: ${designSystem.color.neutral.white};

    // Icon Component
    > div {
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

    // TODO: Globalize Scrollbar
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: designSystem.color.neutral.white,
      borderRadius: "inherit",
    },
    "&::-webkit-scrollbar-thumb": {
      width: "4px",
      height: "156px",
      backgroundColor: designSystem.color.neutral.gray200,
      borderRadius: "4px",
      border: `2px solid ${designSystem.color.neutral.white}`,
    },

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

const portfolioDropdownItemSx = {
  font: designSystem.font.body2.font,
  color: designSystem.color.neutral.gray900,
};

const fixedDropdownItemSx = {
  font: designSystem.font.body2.font,
  color: designSystem.color.neutral.gray600,
  borderRadius: "4px",
};
