import SelectableTable from "@components/Table/SelectableTable";
import { PortfolioItem } from "@features/portfolio/api/types";
import EmptyPortfolioListList from "../EmptyPortfolioList";
import PortfolioListTableBody from "./PortfolioListTableBody";
import PortfolioListTableHead from "./PortfolioListTableHead";
import PortfolioListTableToolBar from "./PortfolioListTableToolBar";

type Props = {
  data: PortfolioItem[];
};

export default function PortfolioListTable({ data }: Props) {
  return (
    <SelectableTable
      tableTitle="포트폴리오 목록"
      initialOrderBy="dateCreated"
      TableToolBar={PortfolioListTableToolBar}
      TableHead={PortfolioListTableHead}
      TableBody={PortfolioListTableBody}
      EmptyTable={EmptyPortfolioListList}
      data={data}
    />
  );
}
