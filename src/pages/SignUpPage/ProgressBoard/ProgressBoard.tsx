import styled from "styled-components";
import { Progress } from "./Progress";

type Props = {
  currentStep: string;
  progressList: { title: string; step: string[] }[];
};

export function ProgressBoard({ progressList, currentStep }: Props) {
  const progressTitleList = progressList.map((progress) => progress.title);
  const currentIndex = progressList.findIndex((item) =>
    item.step.includes(currentStep)
  );

  return (
    <StyledProgressBoard>
      {currentIndex >= 0 &&
        progressTitleList.map((title, index) => (
          <Progress
            key={index}
            progressIndex={index + 1}
            title={title}
            isLast={progressTitleList.length - 1 === index}
            currentIndex={currentIndex + 1}
          />
        ))}
    </StyledProgressBoard>
  );
}

const StyledProgressBoard = styled.div`
  display: flex;
`;
