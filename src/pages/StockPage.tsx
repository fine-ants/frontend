import RateBadge from "@components/common/Badges/RateBadge";
import Button from "@components/common/Buttons/Button";
import Header from "@components/common/Header/Header";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TVStockDetailWidget from "../components/TradingViewWidgets/TVStockDetailWidget";
import BasePage from "./BasePage";

export default function StockPage() {
  const { tickerSymbol } = useParams();
  // const {mutate: addWatchlistItemMutate} = useWatchlistItemAddMutation({tickerSymbol: tickerSymbol});
  // const [isSelectOpen, setIsSelectOpen] = useState(false);
  //TODO: API 기다리는 중

  const onAddWatchlistButtonClick = () => {
    // setIsSelectOpen(true);
  };

  return (
    <>
      <Header />
      <BasePage>
        <Main>
          <ChartContainer>
            <TitleContainer>
              <NameWrapper>
                <Symbol />
                <label>종목명</label>
                <span>{tickerSymbol}</span>
              </NameWrapper>
              <ButtonWrapper>
                <Button variant="tertiary" size="h32">
                  <Icon icon="favorite" size={16} color="gray600" />
                  관심 종목 해제
                </Button>
                <Button
                  variant="secondary"
                  size="h32"
                  onClick={onAddWatchlistButtonClick}>
                  <Icon icon="favorite" size={16} color="blue500" />
                  관심 종목 추가
                </Button>
              </ButtonWrapper>
            </TitleContainer>
            <ValuationContainer>
              <PriceWrapper>
                <span>₩</span>
                <label>종목 현재가</label>
              </PriceWrapper>
              <RateBadge
                size={16}
                rate={12800}
                bgColorStatus={false}
                iconStatus={true}
              />
              <RateBadge
                size={24}
                rate={23.19}
                bgColorStatus={true}
                iconStatus={true}
              />
            </ValuationContainer>
            {tickerSymbol && (
              <TVStockDetailWidget
                tickerSymbol={tickerSymbol}
                width={893}
                height={366}
              />
            )}
          </ChartContainer>
          <StockInfo>
            <label>종목 정보</label>
            <InfoContainer>
              <Info>
                <label>섹터</label>
                <span>종목의 섹터</span>
              </Info>
              <Info>
                <label>배당금</label>
                <span>종목의 배당금</span>
              </Info>
              <Info>
                <label>배당률</label>
                <span>종목의 배당률</span>
              </Info>
              <Info>
                <label>배당주기</label>
                <span>종목의 배당주기</span>
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
  background-color: ${({ theme: { color } }) => color.neutral.white};
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

    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
  > span {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const Symbol = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme: { color } }) => color.primary.blue500};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
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
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  > label {
    font: ${designSystem.font.title1.font};
    letter-spacing: ${designSystem.font.title1.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray800};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 501px;
  margin-bottom: 24px;
`;

const StockInfo = styled.div`
  width: 100%
  height: 85px;
  
  border-radius: 8px;

  background-color: ${({ theme: { color } }) => color.neutral.white};

  > label {
    font: ${designSystem.font.heading3.font};
    letter-spacing: ${designSystem.font.heading3.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray800};
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
  border-right: 1px solid ${({ theme: { color } }) => color.neutral.gray200};

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
    color: ${({ theme: { color } }) => color.neutral.gray600};
  }

  > span {
    font: ${designSystem.font.body3.font};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
