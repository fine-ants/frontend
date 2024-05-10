import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  subtitle: ReactNode;
};

export default function AuthPageHeader({ title, subtitle }: Props) {
  const { isDesktop } = useResponsiveLayout();

  return (
    <StyledAuthPageHeader $isDesktop={isDesktop}>
      <Title $isDesktop={isDesktop}>{title}</Title>
      <Subtitle $isDesktop={isDesktop}>{subtitle}</Subtitle>
    </StyledAuthPageHeader>
  );
}

const StyledAuthPageHeader = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isDesktop }) => ($isDesktop ? "24px" : "8px")};
`;

const Title = styled.h2<{ $isDesktop: boolean }>`
  font: ${({ $isDesktop }) =>
    $isDesktop
      ? designSystem.font.heading2.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isDesktop }) =>
    $isDesktop
      ? designSystem.font.heading2.letterSpacing
      : designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const Subtitle = styled.div<{ $isDesktop: boolean }>`
  font: ${({ $isDesktop }) =>
    $isDesktop ? designSystem.font.body2.font : designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
