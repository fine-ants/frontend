import addIcon from "@assets/icons/ic_folder-add.svg";
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
      <PortfolioAddButton onClick={onPortfolioAddButtonClick}>
        <img src={addIcon} alt="add-icon" />
        <span>포트폴리오 추가</span>
      </PortfolioAddButton>
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
  border: ${({ theme: { color } }) => `1px dashed ${color.primary.blue100}`};
  border-radius: 8px;

  > h1 {
    font: ${designSystem.font.title3.font}
    letter-spacing: ${designSystem.font.title3.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }

  > div {
    font: ${designSystem.font.body3.font}
    color: ${({ theme: { color } }) => color.neutral.gray500};
  }
`;

const PortfolioAddButton = styled.div`
  display: flex;
  margin-inline: auto;
  min-width: 80px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border-radius: 3px;
  font: ${designSystem.font.button2.font}
  letter-spacing: ${designSystem.font.button2.letterSpacing};

  background-color: ${({ theme: { color } }) => color.primary.blue500};
  cursor: pointer;

  > span {
    color: ${({ theme: { color } }) => color.neutral.white};
  }

  &:hover {
    background-color: ${({ theme: { color } }) => color.primary.blue700};
  }
`;
