import { PortfolioHolding } from "@api/portfolio";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import PortfolioHoldingRow from "./PortfolioHoldingRow";

type Props = {
  portfolioId: number;
  data: PortfolioHolding[];
};

export default function PortfolioHoldingsTable({ portfolioId, data }: Props) {
  return (
    <Table
      style={{ backgroundColor: "#FFFFFF" }}
      aria-label="collapsible table">
      <TableHead style={{ backgroundColor: "#FFFFFF" }}>
        <ColumnHeader style={{ backgroundColor: "#FFFFFF" }}>
          <TableCell />
          <ColumnHeaderCell>종목명</ColumnHeaderCell>
          <ColumnHeaderCell align="right">평가금액</ColumnHeaderCell>
          <ColumnHeaderCell align="right">현재가</ColumnHeaderCell>
          <ColumnHeaderCell align="right">평균 매입가</ColumnHeaderCell>
          <ColumnHeaderCell align="right">개수</ColumnHeaderCell>
          <ColumnHeaderCell align="right">변동률</ColumnHeaderCell>
          <ColumnHeaderCell align="right">총 손익</ColumnHeaderCell>
          <ColumnHeaderCell align="right">연 배당금</ColumnHeaderCell>
        </ColumnHeader>
      </TableHead>

      <TableBody>
        {data.map((portfolioHolding) => (
          <PortfolioHoldingRow
            key={portfolioHolding.tickerSymbol}
            portfolioId={portfolioId}
            row={portfolioHolding}
          />
        ))}
      </TableBody>
    </Table>
  );
}

const ColumnHeader = styled(TableRow)`
  background-color: #f6f6f8;
`;

const ColumnHeaderCell = styled(TableCell)`
  padding: 5px 0;
`;
