import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  subtitle: ReactNode;
};

export default function AuthPageHeaderD({ title, subtitle }: Props) {
  return (
    <StyledAuthPageHeaderD>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </StyledAuthPageHeaderD>
  );
}

const StyledAuthPageHeaderD = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font: ${designSystem.font.heading2.font};
  letter-spacing: ${designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const Subtitle = styled.div`
  font: ${designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray600};
`;
