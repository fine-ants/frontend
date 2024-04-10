import useStockPageQuery from "@api/stock/queries/useStockPageQeury";
import TVStockDetailWidget from "@components/TradingViewWidgets/TVStockDetailWidget";
import RateBadge from "@components/common/Badges/RateBadge";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TargetPriceAlertDropdown from "./TargetPriceAlertDropdown/TargetPriceAlertDropdown";
import { WatchlistHasStockDropdown } from "./WatchlistHasStock/WatchlistHasStockDropdown";

export default function StockDetails() {
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
      <Header>
        <NameWrapper>
          <Symbol />
          <label>{companyName}</label>
          <span>{tickerSymbol}</span>
        </NameWrapper>

        <ButtonsWrapper>
          {tickerSymbol && (
            <>
              <WatchlistHasStockDropdown tickerSymbol={tickerSymbol} />
              <TargetPriceAlertDropdown />
            </>
          )}
        </ButtonsWrapper>
      </Header>

      <ValuationContainer>
        <PriceWrapper>
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

      <ChartContainer>
        {tickerSymbol && (
          <TVStockDetailWidget
            tickerSymbol={widgetStockCode(tickerSymbol, market)}
            width={1376}
            height={501}
          />
        )}
      </ChartContainer>

      <StockInfo>
        <label>종목 정보</label>
        <InfoContainer>
          <Info>
            <label>섹터</label>
            <span>{sector}</span>
          </Info>
          <Info>
            <label>배당금</label>
            <span>{annualDividend}</span>
          </Info>
          <Info>
            <label>배당률</label>
            <span>{annualDividendYield}</span>
          </Info>
          <Info>
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

const Header = styled.header`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > label {
    font: ${designSystem.font.heading2.font};
    letter-spacing: ${designSystem.font.heading2.letterSpacing};

    color: ${designSystem.color.neutral.gray900};
  }
  > span {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray400};
  }
`;

const Symbol = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  // TODO: Change to actual image instead of background color
  background-color: ${designSystem.color.primary.blue500};
`;

const ButtonsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

const ValuationContainer = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  > span {
    font: ${designSystem.font.title2.font};
    letter-spacing: ${designSystem.font.title2.letterSpacing};
    color: ${designSystem.color.neutral.gray400};
  }

  > label {
    font: ${designSystem.font.title1.font};
    letter-spacing: ${designSystem.font.title1.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
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

const InfoContainer = styled.div`
  margin-top: 24px;
  display: flex;
`;

const Info = styled.div`
  width: 308px;
  height: 24px;
  padding: 4px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  border-right: 1px solid ${designSystem.color.neutral.gray200};

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
    padding-right: 0;
  }

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
