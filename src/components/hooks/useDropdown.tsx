import { Menu, MenuItem, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";

type DropdownMenuProps = {
  sx?: SxProps;
  children: ReactNode;
};

type DropdownItemProps = {
  sx?: SxProps;
  item: {
    name: string;
    onClick: () => void;
  };
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

  function DropdownMenu({ sx, children }: DropdownMenuProps) {
    return (
      <Menu sx={sx} anchorEl={anchorElement} open={open} onClose={onClose}>
        {children}
      </Menu>
    );
  }

  function DropdownItem({ sx, item }: DropdownItemProps) {
    const { name, onClick } = item;

    const onClickHandler = () => {
      onClick();
      onClose();
    };

    return (
      <MenuItem sx={sx} onClick={onClickHandler}>
        {name}
      </MenuItem>
    );
  }

  return { isOpen: open, onOpen, onClose, DropdownMenu, DropdownItem };
}
