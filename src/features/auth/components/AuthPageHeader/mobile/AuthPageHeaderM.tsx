import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  subtitle: ReactNode;
};

export default function AuthPageHeaderM({ title, subtitle }: Props) {
  return (
    <StyledAuthPageHeaderM>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </StyledAuthPageHeaderM>
  );
}

const StyledAuthPageHeaderM = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const Subtitle = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;
