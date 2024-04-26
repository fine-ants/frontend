import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type NavBarProps = {
  children: ReactNode;
};

type NavItemProps = {
  item?: { name: string; to: string };
  children?: ReactNode;
};

export function NavBar({ children }: NavBarProps) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && (
        <StyledNavBarD>
          <ul>{children}</ul>
        </StyledNavBarD>
      )}
      {isMobile && (
        <StyledNavBarM>
          <ul>{children}</ul>
        </StyledNavBarM>
      )}
    </>
  );
}

function NavItem({ item, children }: NavItemProps) {
  if (item && children) {
    throw new Error("Only provide either an item or children to NavItem.");
  }

  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && (
        <StyledNavItemD>
          {item ? (
            <StyledNavItemContentD to={item.to}>
              {item.name}
            </StyledNavItemContentD>
          ) : (
            children
          )}
        </StyledNavItemD>
      )}

      {isMobile && (
        <StyledNavItemM>
          {item ? (
            <StyledNavItemContentM to={item.to}>
              {item.name}
            </StyledNavItemContentM>
          ) : (
            children
          )}
        </StyledNavItemM>
      )}
    </>
  );
}

NavBar.NavItem = NavItem;

// Desktop
const StyledNavBarD = styled.nav`
  > ul {
    display: flex;
    gap: 40px;
    background-color: ${designSystem.color.neutral.gray900};
    font: ${designSystem.font.title4.font};
    letter-spacing: ${designSystem.font.title4.letterSpacing};
  }
`;

const StyledNavItemD = styled.li`
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

const StyledNavItemContentD = styled(Link)`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;

// Mobile
const StyledNavBarM = styled.nav`
  width: 100%;
  height: 64px;
  position: fixed;
  bottom: 0;
  z-index: 10;

  > ul {
    height: 100%;
    display: flex;
    background-color: ${designSystem.color.neutral.white};
    border-top: 1px solid ${designSystem.color.neutral.gray100};
  }
`;

const StyledNavItemM = styled.li`
  padding: 12px 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledNavItemContentM = styled(Link)`
  font: ${designSystem.font.title7.font};
  letter-spacing: ${designSystem.font.title7.letterSpacing};
`;
