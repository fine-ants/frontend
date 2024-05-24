import { SelectableCardTable } from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { SelectableCardTableToolbar } from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import { PortfolioItem } from "@features/portfolio/api/types";
import { PortfolioListCardBody } from "./PortfolioListCardBody";

type Props = {
  data: PortfolioItem[];
};

export function PortfolioListCardTable({ data }: Props) {
  return (
    <>
      <SelectableCardTable
        CardBody={PortfolioListCardBody}
        CardTableToolbar={SelectableCardTableToolbar}
        data={data}
      />
    </>
  );
}
