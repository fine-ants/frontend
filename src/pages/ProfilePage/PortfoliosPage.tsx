import { PortfolioItem } from "@api/portfolio";
import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { thousandsDelimiter } from "../../utils/thousandsDelimiter";

export default function PortfoliosPage() {
  const { data: portfolioList } = usePortfolioListQuery();

  return (
    <div>
      <PortfolioTable>
        <tbody>
          <tr>
            <th>이름</th>
            <th>투자 예산</th>
            <th>총 수익</th>
            <th>당일 손익</th>
            <th>당월 배당 예상금</th>
            <th>종목 개수</th>
          </tr>
          {portfolioList &&
            portfolioList.portfolios.map((portfolio) => (
              <Portfolio key={portfolio.id} portfolio={portfolio} />
            ))}
        </tbody>
      </PortfolioTable>
    </div>
  );
}

type Props = { portfolio: PortfolioItem };

function Portfolio({ portfolio }: Props) {
  const navigate = useNavigate();

  const onPortfolioClick = () => {
    navigate(`/portfolio/${portfolio.id}`);
  };

  return (
    <tr onClick={onPortfolioClick}>
      <td>
        <SymbolImg src={portfolio.securitiesFirm} />
        <span>{portfolio.name}</span>
      </td>
      <td>{thousandsDelimiter(portfolio.budget ?? 0)}</td>
      <td>
        <div>{portfolio.totalGain}%</div>
        <div>{thousandsDelimiter(portfolio.totalGainRate ?? 0)}</div>
      </td>
      <td>
        <div>{portfolio.dailyGain}%</div>
        <div>{thousandsDelimiter(portfolio.dailyGainRate ?? 0)}</div>
      </td>
      <td>{thousandsDelimiter(portfolio.expectedMonthlyDividend ?? 0)}</td>
      <td>{thousandsDelimiter(portfolio.totalNumShares ?? 0)}</td>
    </tr>
  );
}

const SymbolImg = styled.img`
  width: 30px;
  height: 30px;
`;

const PortfolioTable = styled.table`
  width: 930px;
  border: 1px solid black;
  border-collapse: collapse;

  td:not(:first-child) {
    text-align: center;
  }
  td,
  th {
    border-bottom: 1px solid black;
  }
`;
