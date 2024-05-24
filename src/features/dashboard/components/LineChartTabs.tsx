import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  tabs: string[];
  currentIndex: number;
  onClick: (index: number) => void;
};

type ButtonProps = {
  content: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function LineChartTabs({ tabs, currentIndex, onClick }: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledLineChartTabs $isMobile={isMobile}>
      {tabs.map((content, index) => (
        <LineChartTab
          key={index}
          content={content}
          isSelected={index === currentIndex}
          onClick={() => onClick(index)}
        />
      ))}
    </StyledLineChartTabs>
  );
}

function LineChartTab({ content, isSelected, onClick }: ButtonProps) {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledLineChartTab
      onClick={onClick}
      $isSelected={isSelected}
      $isMobile={isMobile}>
      {content}
    </StyledLineChartTab>
  );
}

const StyledLineChartTabs = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "264px")};
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 4px;
  border: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledLineChartTab = styled.button<{
  $isSelected: boolean;
  $isMobile: boolean;
}>`
  width: ${({ $isMobile }) => ($isMobile ? "18.6%" : "48px")};
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: ${({ $isSelected }) =>
    $isSelected
      ? designSystem.color.primary.blue50
      : designSystem.color.neutral.white};
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${({ $isSelected }) =>
    $isSelected
      ? designSystem.color.primary.blue500
      : designSystem.color.neutral.gray600};
`;
