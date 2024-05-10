import useResponsiveLayout from "@hooks/useResponsiveLayout";
import styled from "styled-components";
import { Progress } from "./Progress";

type Props = {
  currentStep: string;
  progressList: { title: string; step: string[] }[];
};

export function ProgressBoard({ progressList, currentStep }: Props) {
  const { isMobile } = useResponsiveLayout();

  const progressTitleList = progressList.map((progress) => progress.title);
  const currentIndex = progressList.findIndex((item) =>
    item.step.includes(currentStep)
  );

  return (
    <StyledProgressBoard $isMobile={isMobile}>
      {currentIndex >= 0 &&
        progressTitleList.map((title, index) => (
          <Progress
            key={index}
            stepNumber={index + 1}
            title={title}
            isLast={progressTitleList.length - 1 === index}
            currentStepNumber={currentIndex + 1}
          />
        ))}
    </StyledProgressBoard>
  );
}

const StyledProgressBoard = styled.div<{ $isMobile: boolean }>`
  display: flex;
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "0")};
`;
