import {
  PortfolioDetails,
  PortfolioHolding,
} from "@features/portfolio/api/types";
import styled from "styled-components";
import PortfolioHeaderM from "../../PortfolioHeaderM";
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
