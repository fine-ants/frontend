import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { PortfolioDetails } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import styled from "styled-components";

import PortfolioHoldingAddDialog from "../../PortfolioHolding/PortfolioHoldingAddDialog";
import PortfolioOverviewBodyM from "./PortfolioOverviewBodyM";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverviewM({ data }: Props) {
  const {
    state: isAddHoldingDialogOpen,
    setTrue: onDialogOpen,
    setFalse: onDialogClose,
  } = useBoolean();

  return (
    <>
      <PortfolioOverviewBodyM data={data} />

      <ButtonWrapper>
        <Button variant="primary" size="h40" onClick={onDialogOpen}>
          <Icon icon="add" size={16} color="white" />
          <span>종목 추가</span>
        </Button>
      </ButtonWrapper>

      {isAddHoldingDialogOpen && (
        <PortfolioHoldingAddDialog
          isOpen={isAddHoldingDialogOpen}
          onClose={onDialogClose}
        />
      )}
    </>
  );
}
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 16px 16px 24px;
`;
