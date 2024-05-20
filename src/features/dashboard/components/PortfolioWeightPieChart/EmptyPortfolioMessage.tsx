import emptyFolder from "@assets/images/empty_folder.svg";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  onPortfolioAddButtonClick: () => void;
};

export default function EmptyPortfolioMessage({
  onPortfolioAddButtonClick,
}: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <StyledEmptyPortfolioMessage $isMobile={isMobile}>
      <img width={64} src={emptyFolder} alt="비어 있는 폴더 이미지" />

      <StyledContentWrapper $isMobile={isMobile}>
        <h1>포트폴리오를 추가하세요</h1>
        <span>
          내가 보유한 포트폴리오 비중이 {!isMobile && <br />} 여기에 표시됩니다
        </span>
      </StyledContentWrapper>
      <Button
        variant="primary"
        size={isMobile ? "h40" : "h32"}
        onClick={onPortfolioAddButtonClick}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>포트폴리오 추가</span>
      </Button>
    </StyledEmptyPortfolioMessage>
  );
}

const StyledEmptyPortfolioMessage = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "300px")};
  height: ${({ $isMobile }) => ($isMobile ? "240px" : "363px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${designSystem.color.primary.blue100};
  border-radius: 8px;

  > img {
    margin-bottom: ${({ $isMobile }) => ($isMobile ? "8px" : "24px")};
  }
`;

const StyledContentWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;

  > h1 {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title4.font
        : designSystem.font.title3.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title4.letterSpacing
        : designSystem.font.title3.letterSpacing};

    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    text-align: center;
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
