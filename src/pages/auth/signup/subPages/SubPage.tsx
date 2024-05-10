import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function SubPage({ children, ...props }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <StyledSubPage $isDesktop={isDesktop} $isMobile={isMobile} {...props}>
      {children}
    </StyledSubPage>
  );
}

const StyledSubPage = styled.div<{ $isDesktop: boolean; $isMobile: boolean }>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  gap: ${({ $isDesktop }) => ($isDesktop ? "48px" : "40px")};
`;
