import { Menu, MenuItem } from "@mui/material";
import { ReactNode, useState } from "react";
import { CSSProperties } from "styled-components";

type DropdownMenuProps = {
  children: ReactNode;
  style?: CSSProperties;
};

type DropdownItemProps = {
  item: {
    name: string;
    onClick: () => void;
  };
  style?: CSSProperties;
};

export function useDropdown() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorElement);

  const onOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  function DropdownMenu({ children, style }: DropdownMenuProps) {
    return (
      <Menu
        style={style}
        anchorEl={anchorElement}
        open={open}
        onClose={onClose}>
        {children}
      </Menu>
    );
  }

  function DropdownItem({ item, style }: DropdownItemProps) {
    const { name, onClick } = item;

    const onClickHandler = () => {
      onClick();
      onClose();
    };

    return (
      <MenuItem style={style} onClick={onClickHandler}>
        {name}
      </MenuItem>
    );
  }

  return { onOpen, onClose, DropdownMenu, DropdownItem };
}
