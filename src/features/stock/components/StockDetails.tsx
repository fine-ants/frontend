import RateBadge from "@components/Badges/RateBadge";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import useStockPageQuery from "@features/stock/api/queries/useStockPageQeury";
import { thousandsDelimiter } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StockHeader from "./StockHeader";

export default function StockDetails() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { tickerSymbol } = useParams();

  const { data: stockData } = useStockPageQuery(tickerSymbol as string);
  const {
    companyName,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    sector,
    annualDividend,
    annualDividendYield,
    dividendMonths,
    market,
  } = stockData;

  return (
    <>
      <StockHeader
        companyName={companyName}
        tickerSymbol={tickerSymbol as string}
      />

      <ValuationContainer $isMobile={isMobile}>
        <PriceWrapper $isMobile={isMobile}>
          <span>₩</span>
          <label>{thousandsDelimiter(currentPrice ?? 0)}</label>
        </PriceWrapper>
        <RateBadge
          size={16}
          value={dailyChange ?? 0}
          bgColorStatus={false}
          iconStatus={true}
          noPercent={true}
        />
        <RateBadge
          size={24}
          value={dailyChangeRate ?? 0}
          bgColorStatus={true}
          iconStatus={true}
        />
      </ValuationContainer>

      <ChartContainer $isMobile={isMobile}>
        {tickerSymbol && (
          <TVStockDetailWidget
            tickerSymbol={widgetStockCode(tickerSymbol, market)}
          />
        )}
      </ChartContainer>

      <StockInfo>
        <label>종목 정보</label>
        <InfoContainer $isMobile={isMobile}>
          <Info $isMobile={isMobile} $isDesktop={isDesktop}>
            <label>섹터</label>
            <span>{sector}</span>
          </Info>
          <Info $isMobile={isMobile} $isDesktop={isDesktop}>
            <label>배당금</label>
            <span>{annualDividend}</span>
          </Info>
          <Info $isMobile={isMobile} $isDesktop={isDesktop}>
            <label>배당률</label>
            <span>{annualDividendYield}</span>
          </Info>
          <Info $isMobile={isMobile} $isDesktop={isDesktop}>
            <label>배당주기</label>
            <span>
              {dividendMonths.length > 0 ? dividendMonths.join(", ") : "-"}
            </span>
          </Info>
        </InfoContainer>
      </StockInfo>
    </>
  );
}

const widgetStockCode = (
  tickerSymbol: string = "KOSPI",
  market: string = "KOSPI"
) => {
  switch (market) {
    case "KOSPI":
      return `KRX:${tickerSymbol}`;
    case "KOSDAQ":
      return `KRX:${tickerSymbol}`;
    case "NASDAQ":
      return `NASDAQ:${tickerSymbol}`;
    default:
      return `KRX:KOSPI`;
  }
};

const ValuationContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "32px" : "8px")};
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PriceWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;

  > span {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.font
        : designSystem.font.title2.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title3.letterSpacing
        : designSystem.font.title2.letterSpacing};
    color: ${designSystem.color.neutral.gray400};
  }

  > label {
    font: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title2.font
        : designSystem.font.title1.font};
    letter-spacing: ${({ $isMobile }) =>
      $isMobile
        ? designSystem.font.title2.letterSpacing
        : designSystem.font.title1.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const ChartContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: 500px;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "32px" : "40px")};
`;

const StockInfo = styled.div`
  width: 100%;
  height: 85px;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};

  > label {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const InfoContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-wrap: ${({ $isMobile }) => ($isMobile ? "wrap" : "nowrap")};
`;

const Info = styled.div<{ $isMobile: boolean; $isDesktop: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "50%" : "308px")};
  height: 24px;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  ${({ $isMobile }) => {
    return $isMobile
      ? `
        &:nth-child(1),
        &:nth-child(2) {
          margin-bottom: 24px;
        }

        &:nth-child(odd) {
          padding-right: 24px;
          padding-left: 0;
          border-right: 1px solid ${designSystem.color.neutral.gray200};
        }

        &:nth-child(even) {
          padding-left: 24px;
        }
      `
      : `
        padding-inline: 24px;
        border-right: 1px solid ${designSystem.color.neutral.gray200};

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          border-right: none;
          padding-right: 0;
        }
      `;
  }}

  > label {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  > span {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray900};
  }
`;
