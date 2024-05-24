import graphImage from "@assets/images/graph_image.svg";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export function EmptyLineChartMessage() {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledEmptyLineChartMessage $isMobile={isMobile}>
      <img src={graphImage} alt="그래프 이미지" />
      <MessageBox>
        <h1>아직 자산이 없습니다</h1>
        <span>내가 보유한 자산 추이가 여기에 표시됩니다</span>
      </MessageBox>
    </StyledEmptyLineChartMessage>
  );
}

const StyledEmptyLineChartMessage = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: 363px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${designSystem.color.primary.blue100};
  border-radius: 8px;
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "24px")};
`;

const MessageBox = styled.div`
  height: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  > h1 {
    font: ${designSystem.font.title3.font};
    letter-spacing: ${designSystem.font.title3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    text-align: center;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
