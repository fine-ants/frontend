import designSystem from "@styles/designSystem";
import styled from "styled-components";

type ProgressProps = {
  progressIndex: number;
  title: string;
  isLast: boolean;
  currentIndex: number;
};

export function Progress({
  progressIndex,
  title,
  isLast,
  currentIndex,
}: ProgressProps) {
  return (
    <StyledProgress>
      <ProgressContent>
        <ProgressIndex
          $currentIndex={currentIndex}
          $progressIndex={progressIndex}>
          {progressIndex}
        </ProgressIndex>
        <ProgressTitle
          $currentIndex={currentIndex}
          $progressIndex={progressIndex}>
          {title}
        </ProgressTitle>
      </ProgressContent>
      {!isLast && (
        <Dots>
          {Array.from({ length: 3 }).map((_, index) => (
            <Dot
              key={index}
              $currentIndex={currentIndex}
              $progressIndex={progressIndex}
            />
          ))}
        </Dots>
      )}
    </StyledProgress>
  );
}

const getBackgroundStyle = (currentIndex: number, progressIndex: number) => {
  if (currentIndex === progressIndex) {
    return designSystem.color.primary.blue500;
  } else if (currentIndex < progressIndex) {
    return designSystem.color.neutral.gray400;
  } else {
    return designSystem.color.primary.blue200;
  }
};

const getColorStyle = (currentIndex: number, progressIndex: number) => {
  if (currentIndex === progressIndex) {
    return designSystem.color.primary.blue500;
  } else if (currentIndex < progressIndex) {
    return designSystem.color.neutral.gray600;
  } else {
    return designSystem.color.primary.blue300;
  }
};

const StyledProgress = styled.div`
  display: flex;
`;

const ProgressContent = styled.div`
  width: 102px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ProgressIndex = styled.div<{
  $currentIndex: number;
  $progressIndex: number;
}>`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: ${({ $currentIndex, $progressIndex }) =>
    getBackgroundStyle($currentIndex, $progressIndex)};

  color: ${designSystem.color.neutral.white};
  text-align: center;
  font-family: "IBM Plex Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: -0.24px;
`;

const ProgressTitle = styled.div<{
  $currentIndex: number;
  $progressIndex: number;
}>`
  color: ${({ $currentIndex, $progressIndex }) =>
    getColorStyle($currentIndex, $progressIndex)};
  font: ${designSystem.font.title6};
  text-align: center;
`;

const Dots = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div<{ $currentIndex: number; $progressIndex: number }>`
  width: 4px;
  height: 4px;
  flex-shrink: 0;
  background: ${({ $currentIndex, $progressIndex }) =>
    getBackgroundStyle($currentIndex, $progressIndex)};
  border-radius: 50%;
`;
