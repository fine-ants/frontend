import PortfolioListTable from "@components/Portfolio/PortfolioList/PortfolioListTable";
import Pagination from "@components/common/Pagination/Pagination";
import TablePagination from "@components/common/Pagination/TablePagination";
import BasePage from "@pages/BasePage";
import PortfolioListPageSkeleton from "@pages/Portfolio/skeletons/PortfolioListPageSkeleton";
import { Suspense } from "react";
import styled from "styled-components";

export default function PortfolioListPage() {
  return (
    <BasePage>
      <Suspense fallback={<PortfolioListPageSkeleton />}>
        <Container>
          <Header>
            <h1>내 포트폴리오</h1>
          </Header>

          <Pagination count={10} />
          <TablePagination count={29} />

          <PortfolioListTable />
        </Container>
      </Suspense>
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
    font: ${({ theme: { font } }) => font.heading2};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
