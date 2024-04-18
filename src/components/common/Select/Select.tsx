import {
  InputBase,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export type Size = "h24" | "h32" | "h40";

type Props = {
  size: Size;
  menuMinHeight?: string;
  menuMaxHeight?: string;
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
  menuMaxHeight,
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
      IconComponent={(props) => (
        <IconWrapper className={`material-icons ${props.className}`}>
          <Icon
            icon={isOpen ? "chevron-up" : "chevron-down"}
            size={12}
            color="gray600"
          />
        </IconWrapper>
      )}
      MenuProps={{ sx: MenuSX(size, menuMinHeight, menuMaxHeight) }}>
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
    background-color: ${designSystem.color.neutral.white};
    border: 1px solid
      ${({ $isOpen }) =>
        $isOpen
          ? designSystem.color.primary.blue500
          : designSystem.color.neutral.gray200};
    border-radius: ${({ $size }) => ($size === "h24" ? 2 : 3)}px;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray900};

    &:hover {
      border-color: ${designSystem.color.primary.blue500};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: auto;
`;

const MenuSX = (
  size: Size,
  menuMinHeight?: string,
  menuMaxHeight?: string
) => ({
  "& .MuiPaper-root": {
    "minHeight": menuMinHeight ? menuMinHeight : "160px",
    "maxHeight": menuMaxHeight ? menuMaxHeight : "240px",
    "minWidth": `${size === "h24" ? 56 : 80}px`,

    "marginTop": "2px",
    "padding": "4px",

    ".MuiMenu-list": {
      padding: "0",
    },
  },
});
