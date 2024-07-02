import SelectableCardTable from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { PortfolioHolding } from "@features/portfolio/api/types";
import EmptyPortfolioHoldingTable from "../EmptyPortfolioHoldingTable";
import PortfolioHoldingCardBody from "./PortfolioHoldingCardBody";
import PortfolioHoldingCardTableToolbar from "./PortfolioHoldingCardTableToolbar";

type Props = {
  data: PortfolioHolding[];
};

export default function PortfolioHoldingCardTable({ data }: Props) {
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

const orderByList: { title: string; orderBy: keyof PortfolioHolding }[] = [
  { title: "종목명", orderBy: "companyName" },
  { title: "평가 금액", orderBy: "currentValuation" },
  { title: "현재가", orderBy: "currentPrice" },
  { title: "평균 매입가", orderBy: "averageCostPerShare" },
  { title: "개수", orderBy: "numShares" },
  { title: "변동률", orderBy: "dailyChangeRate" },
  { title: "총 손익", orderBy: "totalGain" },
  { title: "연 배당금", orderBy: "annualDividend" },
];
