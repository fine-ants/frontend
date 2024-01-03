import styled from "styled-components";
import { Progress } from "./Progress";

type Props = {
  currentStep: string;
  progressList: {
    [key: string]: string[];
  };
};

export function ProgressBoard({ progressList, currentStep }: Props) {
  const progressTitle = Object.keys(progressList);
  const currentIndex = progressTitle.findIndex((title) =>
    progressList[title].includes(currentStep)
  );

  return (
    <StyledProgressBoard>
      {currentIndex >= 0 &&
        progressTitle.map((title, index) => (
          <Progress
            key={index}
            progressIndex={index + 1}
            title={title}
            isLast={progressTitle.length - 1 === index}
            currentIndex={currentIndex + 1}
          />
        ))}
    </StyledProgressBoard>
  );
}

const StyledProgressBoard = styled.div`
  display: flex;
`;
