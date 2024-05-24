import { SelectableCardTable } from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { SelectableCardTableToolbar } from "@components/CardTable/SelectableCardTable/SelectableCardTableToolbar";
import { PortfolioItem } from "@features/portfolio/api/types";
import { PortfolioListCardList } from "./PortfolioListCardList";

type Props = {
  data: PortfolioItem[];
};

export function PortfolioListCardTable({ data }: Props) {
  return (
    <>
      <SelectableCardTable
        CardList={PortfolioListCardList}
        CardListToolbar={SelectableCardTableToolbar}
        data={data}
      />
    </>
  );
}
