import { AsyncBoundary } from "@components/AsyncBoundary";
import TableSkeleton from "@components/Table/TableSkeleton";
import { PortfolioList } from "@features/portfolio/components/PortfolioList/PortfolioList";
import { PortfolioListTableErrorFallback } from "@features/portfolio/components/PortfolioList/errorFallback/PortfolioListTableErrorFallback";
import BasePage from "@pages/BasePage";

export default function PortfolioListPage() {
  return (
    <BasePage>
      <AsyncBoundary
        ErrorFallback={PortfolioListTableErrorFallback}
        SuspenseFallback={<TableSkeleton />}>
        <PortfolioList />
      </AsyncBoundary>
    </BasePage>
  );
}
