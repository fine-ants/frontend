import { ReactNode, createContext, useContext, useState } from "react";
import { CSSProperties } from "styled-components";

const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
});

export default function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownToggle({
  children,
  style = dropdownToggleStyle,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const { toggle } = useContext(DropdownContext);

  return (
    <button style={style} onClick={toggle}>
      {children}
    </button>
  );
}

function DropdownMenu({
  children,
  style = dropdownMenuStyle,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? (
    <div style={{ position: "relative" }}>
      <ul style={{ ...style, position: "absolute" }}>{children}</ul>
    </div>
  ) : null;
}

function DropdownItem({
  style = dropdownItemStyle,
  item,
}: {
  style?: CSSProperties;
  item: {
    name: string;
    onClick: () => void;
  };
}) {
  return (
    <>
      <li style={style} onClick={item.onClick}>
        {item.name}
      </li>
    </>
  );
}

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

const dropdownToggleStyle = {
  width: "80px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  position: "relative" as const,
};

const dropdownMenuStyle = {
  top: "0px",
  backgroundColor: "#ffffff",
  border: "1.5px solid #e5e5e5",
  borderRadius: "8px",
  padding: "10px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "8px",
  width: "200px",
};

const dropdownItemStyle = {
  width: "inherit",
  fontSize: "20px",
  fontWeight: "semibold",
  height: " 30px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};
