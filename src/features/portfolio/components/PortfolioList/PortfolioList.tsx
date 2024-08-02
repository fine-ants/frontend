import { IconButton } from "@components/Buttons/IconButton";
import usePortfolioListQuery from "@features/portfolio/api/queries/usePortfolioListQuery";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import PortfolioAddDialog from "../PortfolioAddOrEditDialog/PortfolioAddOrEditDialog";
import PortfolioListTable from "./desktop/PortfolioListTable";
import { PortfolioListCardTable } from "./mobile/PortfolioListCardTable";

export function PortfolioList() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { data } = usePortfolioListQuery();

  const {
    state: isAddPortfolioDialogOpen,
    setTrue: onAddPortfolioButtonClick,
    setFalse: onAddPortfolioDialogClose,
  } = useBoolean();

  const isEmpty = data.length === 0;

  return (
    <>
      <Header $isMobile={isMobile}>
        <h1>내 포트폴리오</h1>
        {isMobile && !isEmpty && (
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

      {isDesktop && <PortfolioListTable data={data} />}
      {isMobile && <PortfolioListCardTable data={data} />}

      <PortfolioAddDialog
        isOpen={isAddPortfolioDialogOpen}
        onClose={onAddPortfolioDialogClose}
      />
    </>
  );
}

const Header = styled.header<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ $isMobile }) => ($isMobile ? "32px 16px 16px" : "0 0 40px")};

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
