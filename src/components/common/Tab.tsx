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

export function Tab({ tabs, currentIndex, onClick }: Props) {
  return (
    <StyledTab>
      {tabs.map((content, index) => (
        <TabButton
          key={index}
          content={content}
          isSelected={index === currentIndex}
          onClick={() => onClick(index)}
        />
      ))}
    </StyledTab>
  );
}

function TabButton({ content, isSelected, onClick }: ButtonProps) {
  return (
    <StyledTabButton $isSelected={isSelected} onClick={onClick}>
      {content}
    </StyledTabButton>
  );
}

const StyledTab = styled.div`
  width: 264px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 4px;
  border: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledTabButton = styled.button<{ $isSelected: boolean }>`
  width: 48px;
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
