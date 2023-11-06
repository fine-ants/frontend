import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { CSSProperties } from "styled-components";

type Props = {
  style: CSSProperties;
  children: ReactNode;
};

export function NavBar({ style, children }: Props) {
  return (
    <nav>
      <ul style={style}>{children}</ul>
    </nav>
  );
}

function NavItem({
  style,
  item,
}: {
  style: CSSProperties;
  item: { name: string; path: string };
}) {
  const navigate = useNavigate();

  return (
    <li key={item.name}>
      <div style={style} onClick={() => navigate(item.path)}>
        {item.name}
      </div>
    </li>
  );
}

NavBar.NavItem = NavItem;
