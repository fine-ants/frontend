import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import {
  PortfolioDetails,
  PortfolioHolding,
} from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import styled from "styled-components";
import PortfolioHeaderM from "../../PortfolioHeaderM";
import PortfolioHoldingAddDialog from "../../PortfolioHolding/PortfolioHoldingAddDialog";
import PortfolioHoldingCardTable from "../../PortfolioHolding/mobile/PortfolioHoldingCardTable";
import PortfolioOverviewM from "../../PortfolioOverview/mobile/PortfolioOverviewM";

type Props = {
  freshPortfolioDetailsData: PortfolioDetails;
  freshPortfolioHoldingsData: PortfolioHolding[];
  tab: "portfolio" | "chart";
  onChangeTab: (tab: "portfolio" | "chart") => void;
};

export default function MainPanelM({
  freshPortfolioDetailsData,
  freshPortfolioHoldingsData,
  tab,
  onChangeTab,
}: Props) {
  const {
    state: isAddHoldingDialogOpen,
    setTrue: onDialogOpen,
    setFalse: onDialogClose,
  } = useBoolean();

  return (
    <StyledMainPanel>
      <PortfolioHeaderM
        name={freshPortfolioDetailsData.name}
        securitiesFirm={freshPortfolioDetailsData.securitiesFirm}
        tab={tab}
        onChangeTab={onChangeTab}
      />

      <PortfolioOverviewContainer>
        <PortfolioOverviewM data={freshPortfolioDetailsData} />
      </PortfolioOverviewContainer>
      {freshPortfolioHoldingsData.length !== 0 && (
        <ButtonWrapper>
          <Button variant="primary" size="h40" onClick={onDialogOpen}>
            <Icon icon="add" size={16} color="white" />
            <span>종목 추가</span>
          </Button>
        </ButtonWrapper>
      )}

      {isAddHoldingDialogOpen && (
        <PortfolioHoldingAddDialog
          isOpen={isAddHoldingDialogOpen}
          onClose={onDialogClose}
        />
      )}

      <PortfolioHoldingCardTable data={freshPortfolioHoldingsData} />
    </StyledMainPanel>
  );
}

const StyledMainPanel = styled.div`
  width: 100%;
`;

const PortfolioOverviewContainer = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 16px 16px 24px;
`;
