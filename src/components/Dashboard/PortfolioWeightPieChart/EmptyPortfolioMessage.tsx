import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  onPortfolioAddButtonClick: () => void;
};

export default function EmptyPortfolioMessage({
  onPortfolioAddButtonClick,
}: Props) {
  return (
    <StyledEmptyPortfolioMessage>
      <h1>포트폴리오를 추가하세요</h1>
      <div style={{ textAlign: "center" }}>
        내가 보유한 포트폴리오 비중이
        <br />
        여기에 표시됩니다
      </div>

      <Button variant="primary" size="h32" onClick={onPortfolioAddButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>포트폴리오 추가</span>
      </Button>
    </StyledEmptyPortfolioMessage>
  );
}

const StyledEmptyPortfolioMessage = styled.div`
  width: 300px;
  height: 363px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px dashed ${designSystem.color.primary.blue100};
  border-radius: 8px;

  > h1 {
    font: ${designSystem.font.title3.font};
    letter-spacing: ${designSystem.font.title3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > div {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
