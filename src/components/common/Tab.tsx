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
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  gap: 4px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;

const StyledTabButton = styled.button<{ $isSelected: boolean }>`
  width: 48px;
  height: 24px;
  border-radius: 4px;
  color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.primary.blue500 : color.neutral.gray600};
  background-color: ${({ theme: { color }, $isSelected }) =>
    $isSelected ? color.primary.blue50 : color.white};
  font: ${({ theme: { font } }) => font.title5};
  letter-spacing: -0.02em;
`;
