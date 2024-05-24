import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type Props = {
  tabItems: { title: string; to: string }[];
};

export default function SubPageTabs({ tabItems }: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <Nav $isMobile={isMobile}>
      <ul>
        {tabItems.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.to}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </Nav>
  );
}

const Nav = styled.nav<{ $isMobile: boolean }>`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};

  > ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    > li {
      width: ${({ $isMobile }) => ($isMobile ? "50%" : "120px")};
      height: 100%;
      margin-bottom: -2px;
      font: ${designSystem.font.title4.font};
      letter-spacing: ${designSystem.font.title4.letterSpacing};
      color: ${designSystem.color.neutral.gray600};

      > a {
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        line-height: 40px;
      }

      > a.active {
        border-bottom: 2px solid ${designSystem.color.primary.blue500};
        color: ${designSystem.color.primary.blue500};
      }
    }
  }
`;
