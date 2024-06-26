import usePortfolioDetailsQuery from "@features/portfolio/api/queries/usePortfolioDetailsQuery";
import {
  PortfolioDetails,
  PortfolioHolding,
  PortfolioSSE,
} from "@features/portfolio/api/types";
import { useSSE } from "@features/portfolio/hooks/useSSE";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortfolioPageTab } from "../types";
import MainPanelD from "./desktop/MainPanelD";
import MainPanelM from "./mobile/MainPanelM";

type Props = {
  tab: PortfolioPageTab;
  onChangeTab: (tab: PortfolioPageTab) => void;
};

export default function MainPanel({ tab, onChangeTab }: Props) {
  const { portfolioId } = useParams();

  const { isDesktop, isMobile } = useResponsiveLayout();

  const { data: portfolio } = usePortfolioDetailsQuery(Number(portfolioId));

  const {
    data: portfolioSSE,
    //TODO: SSE 에러일때 핸들링처리
  } = useSSE<PortfolioSSE>({
    url: `/api/portfolio/${portfolioId}/holdings/realtime`,
    eventTypeName: "portfolioDetails",
  });

  // Static Data
  const { portfolioDetails, portfolioHoldings } = portfolio;
  // Realtime Data
  const {
    portfolioDetails: portfolioDetailsSSE,
    portfolioHoldings: portfolioHoldingsSSE,
  } = portfolioSSE ?? { portfolioDetails: null, portfolioHoldings: [] };

  const [freshPortfolioDetailsData, setFreshPortfolioDetailsData] =
    useState<PortfolioDetails>(portfolio.portfolioDetails);

  const [freshPortfolioHoldingsData, setFreshPortfolioHoldingsData] = useState<
    PortfolioHolding[]
  >(portfolio.portfolioHoldings);

  useEffect(() => {
    setFreshPortfolioDetailsData({
      ...portfolioDetails,
      ...portfolioDetailsSSE,
    });

    setFreshPortfolioHoldingsData(
      portfolioHoldings.map((holding, index) => ({
        ...holding,
        ...portfolioHoldingsSSE[index],
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioSSE]);

  useEffect(() => {
    setFreshPortfolioDetailsData({
      ...portfolioDetailsSSE,
      ...portfolioDetails,
    });

    setFreshPortfolioHoldingsData(
      portfolioHoldings.map((holding, index) => ({
        ...portfolioHoldingsSSE[index],
        ...holding,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio]);

  const hasNoHoldings = portfolioHoldings.length === 0;

  return (
    <>
      {isDesktop && (
        <MainPanelD
          freshPortfolioDetailsData={freshPortfolioDetailsData}
          freshPortfolioHoldingsData={freshPortfolioHoldingsData}
          hasNoHoldings={hasNoHoldings}
        />
      )}
      {isMobile && (
        <MainPanelM
          freshPortfolioDetailsData={freshPortfolioDetailsData}
          freshPortfolioHoldingsData={freshPortfolioHoldingsData}
          tab={tab}
          onChangeTab={onChangeTab}
        />
      )}
    </>
  );
}
