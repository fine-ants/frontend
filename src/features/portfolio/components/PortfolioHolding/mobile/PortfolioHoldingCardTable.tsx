import SelectableCardTable from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { PortfolioHolding } from "@features/portfolio/api/types";
import EmptyPortfolioHoldingTable from "../desktop/EmptyPortfolioHoldingTable";
import PortfolioHoldingCardBody from "./PortfolioHoldingCardBody";
import PortfolioHoldingCardTableToolbar from "./PortfolioHoldingCardTableToolbar";

type Props = {
  data: PortfolioHolding[];
};

export default function PortfolioHoldingCardTable({ data }: Props) {
  const orderByList: { title: string; orderBy: keyof PortfolioHolding }[] = [
    {
      title: "평가 금액",
      orderBy: "currentValuation",
    },
    {
      title: "총 손익",
      orderBy: "totalGain",
    },
    {
      title: "종목 개수",
      orderBy: "numShares",
    },
  ];

  return (
    <SelectableCardTable
      CardBody={PortfolioHoldingCardBody}
      CardTableToolbar={PortfolioHoldingCardTableToolbar}
      EmptyComponent={EmptyPortfolioHoldingTable}
      data={data}
      initialOrderBy="dateAdded"
      orderByList={orderByList}
    />
  );
}
