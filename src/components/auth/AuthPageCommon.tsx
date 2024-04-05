import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const AuthPageHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthPageTitle = styled.h2`
  font: ${designSystem.font.heading2.font};
  letter-spacing: ${designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

export const AuthPageTitleCaption = styled.div`
  font: ${designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray600};
`;
