import emptyPortfolioImg from "@assets/images/empty_portfolio.svg";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import PortfolioAddOrEditDialog from "../PortfolioAddOrEditDialog/PortfolioAddOrEditDialog";

export default function EmptyPortfolioListList() {
  const { isMobile } = useResponsiveLayout();

  const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();

  return (
    <StyledEmptyPortfolioListTable $isMobile={isMobile}>
      <EmptyPortfolioListImage
        $isMobile={isMobile}
        src={emptyPortfolioImg}
        alt="빈 포트폴리오 이미지"
      />
      <EmptyPortfolioListTitle $isMobile={isMobile}>
        첫번째 포트폴리오를 추가하세요
      </EmptyPortfolioListTitle>
      <EmptyPortfolioListDescription $isMobile={isMobile}>
        포트폴리오를 추가하여 보유한 자산을 효율적으로 관리하세요
      </EmptyPortfolioListDescription>
      <Button
        variant="primary"
        size={isMobile ? "h40" : "h44"}
        onClick={onOpen}>
        <Icon icon="folder-add" size={16} color="white" />
        <span>포트폴리오 추가</span>
      </Button>

      <PortfolioAddOrEditDialog isOpen={isOpen} onClose={onClose} />
    </StyledEmptyPortfolioListTable>
  );
}

const StyledEmptyPortfolioListTable = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
`;

const EmptyPortfolioListImage = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "194px" : "600px")};
  margin-bottom: 48px;
`;

const EmptyPortfolioListTitle = styled.h3<{ $isMobile: boolean }>`
  margin-bottom: 16px;
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.letterSpacing
      : designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const EmptyPortfolioListDescription = styled.p<{ $isMobile: boolean }>`
  margin-bottom: 48px;
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.body3.font : designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray500};
  padding: ${({ $isMobile }) => ($isMobile ? "0 44px" : "0")};
`;
