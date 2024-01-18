import chevronDown from "@assets/icons/ic_chevron-down.svg";
import chevronUp from "@assets/icons/ic_chevron-up.svg";
import {
  InputBase,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode, useState } from "react";
import styled from "styled-components";

export type Size = "h24" | "h32" | "h40";

type Props = {
  size: Size;
  menuMinHeight?: number;
  selectedValue: string;
  changeSelectedValue: (value: string) => void;
  children: ReactNode;
};

/**
 * @param items - A list of items to display in the select menu. Use "-1" for "All".
 */
export default function Select({
  size,
  menuMinHeight,
  selectedValue,
  changeSelectedValue,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (event: SelectChangeEvent) => {
    changeSelectedValue(event.target.value as string);
  };

  return (
    <MuiSelect
      value={selectedValue}
      onChange={onChange}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      input={<BootstrapInput $size={size} $isOpen={isOpen} />}
      SelectDisplayProps={{
        style: {
          paddingRight: "28px",
        },
      }}
      IconComponent={() => (
        <StyledIconComponent src={isOpen ? chevronUp : chevronDown} />
      )}
      MenuProps={{ sx: MenuSX(size, menuMinHeight) }}>
      {children}
    </MuiSelect>
  );
}

const BootstrapInput = styled(InputBase)<{ $size: Size; $isOpen: boolean }>`
  & .MuiInputBase-input {
    height: ${({ $size }) => $size.slice(1)}px;
    min-width: ${({ $size }) => ($size === "h24" ? 56 : 80)}px;
    padding: 0 28px 0 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-sizing: border-box;
    background-color: ${({ theme: { color } }) => color.neutral.white};
    border: 1px solid
      ${({ theme: { color }, $isOpen }) =>
        $isOpen ? color.primary.blue500 : color.neutral.gray200};
    border-radius: ${({ $size }) => ($size === "h24" ? 2 : 3)}px;
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray900};

    &:hover {
      border-color: ${({ theme: { color } }) => color.primary.blue500};
    }
  }
`;

const StyledIconComponent = styled.img`
  width: 12px;
  height: 12px;
  display: inline-block;
  position: absolute;
  right: 8px;
  user-select: none;
  pointer-events: none;
`;

const MenuSX = (size: Size, menuMinHeight?: number) => ({
  "& .MuiPaper-root": {
    "height": menuMinHeight ? `${menuMinHeight}px` : "160px",
    "minWidth": `${size === "h24" ? 56 : 80}px`,
    "marginTop": "2px",
    "padding": "4px",

    ".MuiMenu-list": {
      padding: "0",
    },
  },
});
