import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const AuthPageHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthPageTitle = styled.h2`
  color: ${designSystem.color.neutral.gray900};
  font: ${({ theme: { font } }) => font.heading2.font};
  letter-spacing: ${({ theme: { font } }) => font.heading2.letterSpacing};
`;

export const AuthPageTitleCaption = styled.div`
  color: ${designSystem.color.neutral.gray600};
  font: ${({ theme: { font } }) => font.body2.font};
  letter-spacing: ${({ theme: { font } }) => font.body2.letterSpacing};
`;

export const NextButton = styled.button`
  width: 100%;
  height: 48px;
  background: ${designSystem.color.primary.blue500};
  border-radius: 8px;
  color: white;

  &:disabled {
    background: ${designSystem.color.primary.blue200};
  }
`;
