import { PortfolioHolding } from "@api/portfolio/types";
import Table from "@components/common/Table/Table";
import EmptyPortfolioHoldingTable from "./EmptyPortfolioHoldingTable";
import PortfolioHoldingTableBody from "./PortfolioHoldingTableBody";
import PortfolioHoldingTableHead from "./PortfolioHoldingTableHead";
import PortfolioHoldingTableToolBar from "./PortfolioHoldingTableToolBar";

type Props = {
  data: PortfolioHolding[];
};

export default function PortfolioHoldingTable({ data }: Props) {
  return (
    <Table
      tableTitle="매입 종목 목록"
      initialOrderBy="dateCreated"
      TableToolBar={PortfolioHoldingTableToolBar}
      TableHead={PortfolioHoldingTableHead}
      TableBody={PortfolioHoldingTableBody}
      EmptyTable={EmptyPortfolioHoldingTable}
      data={data}
    />
  );
}
