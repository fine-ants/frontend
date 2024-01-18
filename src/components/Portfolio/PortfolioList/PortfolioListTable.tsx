import usePortfolioListTableQuery from "@api/portfolio/queries/usePortfolioListTableQuery";
import Table from "@components/common/Table/Table";
import EmptyPortfolioListTable from "./EmptyPortfolioListTable";
import PortfolioListTableBody from "./PortfolioListTableBody";
import PortfolioListTableHead from "./PortfolioListTableHead";
import PortfolioListTableToolBar from "./PortfolioListTableToolBar";

export default function PortfolioListTable() {
  const { data } = usePortfolioListTableQuery();

  return (
    <Table
      tableTitle="포트폴리오 목록"
      initialOrderBy="dateCreated"
      TableToolBar={PortfolioListTableToolBar}
      TableHead={PortfolioListTableHead}
      TableBody={PortfolioListTableBody}
      EmptyTable={EmptyPortfolioListTable}
      data={data}
    />
  );
}
