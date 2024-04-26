import useResponsiveLayout from "@hooks/useResponsiveLayout";
import styled from "styled-components";
import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import HeaderTopD from "./desktop/HeaderTopD";
import HeaderTopM from "./mobile/HeaderTopM";

export default function Header() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledHeader>
      {isDesktop && <HeaderTopD />}
      {isMobile && <HeaderTopM />}

      <TVTickerTapeWidget />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: ${({ theme: { color } }) => color.neutral.gray900};
  color: ${({ theme: { color } }) => color.neutral.white};
`;
