import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import SelectableTable from "@components/common/Table/SelectableTable";
import EmptyPortfolioListTable from "./EmptyPortfolioListTable";
import PortfolioListTableBody from "./PortfolioListTableBody";
import PortfolioListTableHead from "./PortfolioListTableHead";
import PortfolioListTableToolBar from "./PortfolioListTableToolBar";

export default function PortfolioListTable() {
  const { data } = usePortfolioListQuery();

  return (
    <SelectableTable
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
