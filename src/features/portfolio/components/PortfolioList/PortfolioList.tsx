import usePortfolioListQuery from "@features/portfolio/api/queries/usePortfolioListQuery";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useEffect } from "react";
import PortfolioListTable from "./desktop/PortfolioListTable";
import { PortfolioListCardTable } from "./mobile/PortfolioListCardTable";

type Props = {
  onEmpty: (value: boolean) => void;
};

export function PortfolioList({ onEmpty }: Props) {
  const { data } = usePortfolioListQuery();

  const { isDesktop, isMobile } = useResponsiveLayout();

  useEffect(() => {
    if (data.length === 0) {
      onEmpty(true);
    }
  }, [data, onEmpty]);

  return (
    <>
      {isDesktop && <PortfolioListTable data={data} />}
      {isMobile && <PortfolioListCardTable data={data} />}
    </>
  );
}
