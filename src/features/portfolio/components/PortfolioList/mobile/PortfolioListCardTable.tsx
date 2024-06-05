import SelectableCardTable from "@components/CardTable/SelectableCardTable/SelectableCardTable";
import { PortfolioItem } from "@features/portfolio/api/types";
import EmptyPortfolioListList from "../EmptyPortfolioList";
import { PortfolioListCardBody } from "./PortfolioListCardBody";
import PortfolioListCardTableToolbar from "./PortfolioListCardTableToolbar";

type Props = {
  data: PortfolioItem[];
};

export function PortfolioListCardTable({ data }: Props) {
  const orderByList: { title: string; orderBy: keyof PortfolioItem }[] = [
    {
      title: "평가 금액",
      orderBy: "currentValuation",
    },
    {
      title: "투자 예산",
      orderBy: "budget",
    },
    {
      title: "총 손익",
      orderBy: "totalGain",
    },
    {
      title: "당일 손익",
      orderBy: "dailyGain",
    },
    {
      title: "당월 예상 배당금",
      orderBy: "expectedMonthlyDividend",
    },
    {
      title: "종목 개수",
      orderBy: "numShares",
    },
  ];

  return (
    <SelectableCardTable
      CardBody={PortfolioListCardBody}
      CardTableToolbar={PortfolioListCardTableToolbar}
      EmptyComponent={EmptyPortfolioListList}
      data={data}
      initialOrderBy="dateCreated"
      orderByList={orderByList}
    />
  );
}
