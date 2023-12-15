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
  font: ${designSystem.font.heading2};
`;

export const AuthPageTitleCaption = styled.div`
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.body2};
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
