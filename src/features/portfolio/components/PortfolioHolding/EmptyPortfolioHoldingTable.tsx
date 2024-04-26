import noHoldingStockImg from "@assets/images/no_holdings_stock.png";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import PortfolioHoldingAddDialog from "./PortfolioHoldingAddDialog";

export default function EmptyPortfolioHoldingTable() {
  const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  return (
    <>
      <StyledEmptyPortfolioHoldingTable>
        <img src={noHoldingStockImg} alt="보유 종목 없음" />

        <TextBox>
          <div>종목을 추가하세요</div>
          <span>보유한 종목을 추가하여 포트폴리오 관리를 시작하세요</span>
        </TextBox>
        <Button
          variant="primary"
          size="h32"
          onClick={() => setIsAddHoldingDialogOpen(true)}>
          <Icon icon="add" size={16} color="white" />
          종목 추가
        </Button>
      </StyledEmptyPortfolioHoldingTable>

      {isAddHoldingDialogOpen && (
        <PortfolioHoldingAddDialog
          isOpen={isAddHoldingDialogOpen}
          onClose={() => setIsAddHoldingDialogOpen(false)}
        />
      )}
    </>
  );
}

const StyledEmptyPortfolioHoldingTable = styled.div`
  width: 100%;
  height: 318px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px dashed ${designSystem.color.primary.blue100};
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;

  > span {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;
