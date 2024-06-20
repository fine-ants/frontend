import CollapsibleSelectableTable from "@components/Table/CollapsibleSelectableTable";
import { PortfolioHolding } from "@features/portfolio/api/types";
import EmptyPortfolioHoldingTable from "./EmptyPortfolioHoldingTable";
import PortfolioHoldingTableBody from "./PortfolioHoldingTableBody";
import PortfolioHoldingTableHead from "./PortfolioHoldingTableHead";
import PortfolioHoldingTableToolBar from "./PortfolioHoldingTableToolBar";

type Props = {
  data: PortfolioHolding[];
};

export default function PortfolioHoldingTable({ data }: Props) {
  return (
    <CollapsibleSelectableTable
      tableTitle="매입 종목 목록"
      initialOrderBy="dateAdded"
      TableToolBar={PortfolioHoldingTableToolBar}
      TableHead={PortfolioHoldingTableHead}
      TableBody={PortfolioHoldingTableBody}
      EmptyTable={EmptyPortfolioHoldingTable}
      data={data}
    />
  );
}
