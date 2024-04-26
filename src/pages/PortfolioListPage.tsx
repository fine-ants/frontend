import { AsyncBoundary } from "@components/AsyncBoundary";
import TableSkeleton from "@components/Table/TableSkeleton";
import PortfolioListTable from "@features/portfolio/components/PortfolioList/PortfolioListTable";
import { PortfolioListTableErrorFallback } from "@features/portfolio/components/PortfolioList/errorFallback/PortfolioListTableErrorFallback";
import BasePage from "@pages/BasePage";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function PortfolioListPage() {
  return (
    <BasePage>
      <Container>
        <Header>
          <h1>내 포트폴리오</h1>
        </Header>

        <AsyncBoundary
          ErrorFallback={PortfolioListTableErrorFallback}
          SuspenseFallback={<TableSkeleton />}>
          <PortfolioListTable />
        </AsyncBoundary>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Header = styled.header`
  width: 100%;
  margin-bottom: 36px;
  display: flex;
  justify-content: space-between;

  h1 {
    font: ${designSystem.font.heading2.font};
    letter-spacing: ${designSystem.font.heading2.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;