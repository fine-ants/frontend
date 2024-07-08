import { useBoolean } from "@fineants/demolition";
import {
  InputBase,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "../Icon";

export type Size = "h24" | "h32" | "h40" | "h48";

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
  const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();

  const onChange = (event: SelectChangeEvent) => {
    changeSelectedValue(event.target.value as string);
  };

  return (
    <MuiSelect
      value={selectedValue}
      onChange={onChange}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      input={<BootstrapInput $size={size} $isOpen={isOpen} />}
      inputProps={{ "aria-label": "포트폴리오 종목 테이블 행 개수 선택" }}
      SelectDisplayProps={{
        style: {
          minWidth: "66px",
          paddingRight: "40px",
        },
      }}
      IconComponent={(props) => (
        <IconWrapper className={`material-icons ${props.className}`}>
          <Icon icon="chevron-down" size={16} color="gray600" />
        </IconWrapper>
      )}
      MenuProps={{ sx: MenuSX(size, menuMinHeight, menuMaxHeight) }}>
      {children}
    </MuiSelect>
  );
}

const BootstrapInput = styled(InputBase)<{ $size: Size; $isOpen: boolean }>`
  & .MuiInputBase-input {
    min-width: ${({ $size }) => ($size === "h24" ? 56 : 80)}px;
    height: ${({ $size }) => $size.slice(1)}px;
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
  width: 32px;
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
