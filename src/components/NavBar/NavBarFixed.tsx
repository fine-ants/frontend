import { Icon, IconType } from "@components/Icon";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "./NavBar";

const mobileNavItems: { icon: IconType; name: string; to: string }[] = [
  {
    icon: "pie-chart",
    name: "대시보드",
    to: Routes.DASHBOARD,
  },
  {
    icon: "folder",
    name: "포트폴리오",
    to: Routes.PORTFOLIOS,
  },
  {
    icon: "favorite",
    name: "관심종목",
    to: Routes.WATCHLISTS,
  },
  {
    icon: "line-chart",
    name: "인덱스",
    to: Routes.INDICES("KRX:KOSPI"),
  },
  {
    icon: "settings",
    name: "설정",
    to: Routes.PROFILE("profile"),
  },
];

export default function NavBarFixed() {
  const { pathname } = window.location;

  return (
    <NavBar>
      {mobileNavItems.map((item) => {
        const isActive = pathname.includes(item.to);
        return (
          <NavBarListItem key={item.name}>
            <NavItemLink to={item.to}>
              <Icon
                icon={item.icon}
                color={isActive ? "blue500" : "gray600"}
                size={24}
              />
              <NavItemName $isActive={isActive}>{item.name}</NavItemName>
            </NavItemLink>
          </NavBarListItem>
        );
      })}
    </NavBar>
  );
}

const NavBarListItem = styled.li`
  width: 20%;
`;

const NavItemLink = styled(NavLink)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const NavItemName = styled.span<{ $isActive: boolean }>`
  font: ${designSystem.font.title7.font};
  letter-spacing: ${designSystem.font.title7.letterSpacing};
  color: ${({ $isActive }) =>
    $isActive
      ? designSystem.color.primary.blue500
      : designSystem.color.neutral.gray600};
`;
