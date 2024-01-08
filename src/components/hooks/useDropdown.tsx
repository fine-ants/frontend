import { Menu, MenuItem, SxProps } from "@mui/material";
import { ReactNode, SyntheticEvent, useState } from "react";

type DropdownMenuProps = {
  sx?: SxProps;
  children: ReactNode;
};

type DropdownItemProps = {
  sx?: SxProps;
  onClick: () => void;
  children: ReactNode;
};

export function useDropdown() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorElement);

  const onOpen = (event: SyntheticEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  function DropdownMenu({ sx, children }: DropdownMenuProps) {
    return (
      <Menu sx={sx} anchorEl={anchorElement} open={open} onClose={onClose}>
        {children}
      </Menu>
    );
  }

  function DropdownItem({ sx, onClick, children }: DropdownItemProps) {
    const onClickHandler = () => {
      onClick();
      onClose();
    };

    return (
      <MenuItem sx={sx} onClick={onClickHandler}>
        {children}
      </MenuItem>
    );
  }

  return { isOpen: open, onOpen, onClose, DropdownMenu, DropdownItem };
}
