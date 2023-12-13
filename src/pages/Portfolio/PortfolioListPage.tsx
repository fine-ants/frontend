import PortfolioListTable from "@components/Portfolio/PortfolioList/PortfolioListTable";
import PortfolioListTableSkeleton from "@components/Portfolio/PortfolioList/skeletons/PortfolioListTableSkeleton";
import BasePage from "@pages/BasePage";
import { Suspense } from "react";
import styled from "styled-components";

export default function PortfolioListPage() {
  return (
    <BasePage>
      <Container>
        <Header>
          <h1>내 포트폴리오</h1>
        </Header>

        <Suspense fallback={<PortfolioListTableSkeleton />}>
          <PortfolioListTable />
        </Suspense>
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
    font: ${({ theme: { font } }) => font.heading2};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
