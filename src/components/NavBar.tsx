import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type NavBarProps = {
  children: ReactNode;
};

type NavItemProps = {
  item?: { name: string; to: string };
  children?: ReactNode;
};

export function NavBar({ children }: NavBarProps) {
  return (
    <StyledNavBar>
      <ul>{children}</ul>
    </StyledNavBar>
  );
}

function NavItem({ item, children }: NavItemProps) {
  if (item && children) {
    throw new Error("Only provide either one of item or children to NavItem.");
  }

  const navigate = useNavigate();

  return (
    <StyledNavItem>
      {item ? (
        <StyledNavItemContent onClick={() => navigate(item.to)}>
          {item.name}
        </StyledNavItemContent>
      ) : (
        children
      )}
    </StyledNavItem>
  );
}

NavBar.NavItem = NavItem;

const StyledNavBar = styled.nav`
  > ul {
    display: flex;
    gap: 40px;
    alignitems: center;
    background-color: ${designSystem.color.neutral.gray900};
    font: ${designSystem.font.title4.font};
    letter-spacing: ${designSystem.font.title4.letterSpacing};
  }
`;

const StyledNavItem = styled.li`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
  cursor: pointer;

  :hover {
    color: ${designSystem.color.neutral.white};
  }
`;

const StyledNavItemContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  background-color: ${designSystem.color.neutral.gray900};
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;
