import { AsyncBoundary } from "@components/AsyncBoundary";
import { IconButton } from "@components/Buttons/IconButton";
import TableSkeleton from "@components/Table/TableSkeleton";
import PortfolioAddDialog from "@features/portfolio/components/PortfolioAddOrEditDialog";
import { PortfolioList } from "@features/portfolio/components/PortfolioList/PortfolioList";
import { PortfolioListTableErrorFallback } from "@features/portfolio/components/PortfolioList/errorFallback/PortfolioListTableErrorFallback";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import BasePage from "@pages/BasePage";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function PortfolioListPage() {
  const { isMobile } = useResponsiveLayout();

  const {
    state: isAddPortfolioDialogOpen,
    setTrue: onAddPortfolioButtonClick,
    setFalse: onAddPortfolioDialogClose,
  } = useBoolean();

  return (
    <BasePage>
      <Container $isMobile={isMobile}>
        <Header $isMobile={isMobile}>
          <h1>내 포트폴리오</h1>
          {isMobile && (
            <IconButton
              icon="folder-add"
              size="h40"
              iconColor="custom"
              customColor={{ color: "white", hoverColor: "blue400" }}
              bgColor="blue500"
              onClick={onAddPortfolioButtonClick}
            />
          )}
        </Header>

        <AsyncBoundary
          ErrorFallback={PortfolioListTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <PortfolioList />
        </AsyncBoundary>
      </Container>

      {isAddPortfolioDialogOpen && (
        <PortfolioAddDialog
          isOpen={isAddPortfolioDialogOpen}
          onClose={onAddPortfolioDialogClose}
        />
      )}
    </BasePage>
  );
}

const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0" : "48px")};
  padding: ${({ $isMobile }) => ($isMobile ? "0" : "32px")};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Header = styled.header<{ $isMobile: boolean }>`
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ $isMobile }) => ($isMobile ? "32px 16px 16px" : "0 0 24px")};

  h1 {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading3.font
        : designSystem.font.heading2.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.heading3.letterSpacing
        : designSystem.font.heading2.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
