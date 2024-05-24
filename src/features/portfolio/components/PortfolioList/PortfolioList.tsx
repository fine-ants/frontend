import usePortfolioListQuery from "@features/portfolio/api/queries/usePortfolioListQuery";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import PortfolioListTable from "./desktop/PortfolioListTable";
import { PortfolioListCardTable } from "./mobile/PortfolioListCardTable";

export function PortfolioList() {
  const { data } = usePortfolioListQuery();

  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <PortfolioListTable data={data} />}
      {isMobile && <PortfolioListCardTable data={data} />}
    </>
  );
}
