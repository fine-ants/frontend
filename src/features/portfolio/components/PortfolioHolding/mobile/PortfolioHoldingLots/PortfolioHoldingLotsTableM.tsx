import { PurchaseHistory } from "@features/portfolio/api/types";
import styled from "styled-components";
import PortfolioHoldingLotsCard from "./PortfolioHoldingLotsCard";

type Props = {
  portfolioHoldingId: number;
  purchaseHistory: PurchaseHistory[];
};

export default function PortfolioHoldingLotsTableM({
  portfolioHoldingId,
  purchaseHistory,
}: Props) {
  return (
    <StyledPortfolioHoldingLotsTable>
      {purchaseHistory.map((lot) => (
        <PortfolioHoldingLotsCard
          key={lot.purchaseHistoryId}
          portfolioHoldingId={portfolioHoldingId}
          lot={lot}
        />
      ))}
    </StyledPortfolioHoldingLotsTable>
  );
}

const StyledPortfolioHoldingLotsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;
