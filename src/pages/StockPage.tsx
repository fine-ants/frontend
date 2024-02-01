import useStockItemQuery from "@api/stock/queries/useStockItemQeury";
import AlertDropdown from "@components/Stock/AlertDropdown";
import { HasStockDropdown } from "@components/Stock/HasStockDropdown";
import RateBadge from "@components/common/Badges/RateBadge";
import Header from "@components/common/Header/Header";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TVStockDetailWidget from "../components/TradingViewWidgets/TVStockDetailWidget";
import BasePage from "./BasePage";

export default function StockPage() {
  const { tickerSymbol } = useParams();

  //TODO: 종목 상세정보 완성되면 변경
  const { data: stockData } = useStockItemQuery(tickerSymbol || "");

  // const onAddAlertClick = () => {
  //   // 알림 기능 생긴 이후에 추가
  // };

  return (
    <>
      <Header />
      <BasePage>
        <Main>
          <ChartContainer>
            <TitleContainer>
              <NameWrapper>
                <Symbol />
                <label>{stockData?.companyName}</label>
                <span>{tickerSymbol}</span>
              </NameWrapper>
              <ButtonWrapper>
                {tickerSymbol && (
                  <>
                    <HasStockDropdown tickerSymbol={tickerSymbol} />
                    <AlertDropdown />
                  </>
                )}
              </ButtonWrapper>
            </TitleContainer>
            <ValuationContainer>
              <PriceWrapper>
                <span>₩</span>
                <label>
                  {thousandsDelimiter(stockData?.currentPrice ?? 0)}
                </label>
              </PriceWrapper>
              <RateBadge
                size={16}
                rate={stockData?.dailyChange ?? 0}
                bgColorStatus={false}
                iconStatus={true}
                noPercent={true}
              />
              <RateBadge
                size={24}
                rate={stockData?.dailyChangeRate ?? 0}
                bgColorStatus={true}
                iconStatus={true}
              />
            </ValuationContainer>
            {tickerSymbol && (
              <TVStockDetailWidget
                tickerSymbol={tickerSymbol}
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
                <span>{stockData?.sector}</span>
              </Info>
              <Info>
                <label>배당금</label>
                <span>{stockData?.annualDividend}</span>
              </Info>
              <Info>
                <label>배당률</label>
                <span>{stockData?.annualDividendYield}</span>
              </Info>
              <Info>
                <label>배당주기</label>
                {stockData?.dividendMonths.map((month) => <span>{month}</span>)}
              </Info>
            </InfoContainer>
          </StockInfo>
        </Main>
      </BasePage>
    </>
  );
}

const Main = styled.div`
  margin-top: 48px;
  width: 1440px;
  height: 796px;
  padding: 32px;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const TitleContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
  background-color: ${designSystem.color.primary.blue500};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

const ValuationContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 308px;
  height: 24px;
  padding: 4px 24px;
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
