import { IconButton } from "@components/Buttons/IconButton";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TargetPriceAlertDropdown from "./desktop/TargetPriceAlertDropdown";
import { WatchlistHasStockDropdown } from "./desktop/WatchlistHasStockDropdown/WatchlistHasStockDropdown";
import StockActionDrawer from "./mobile/StockActionDrawer";

type Props = {
  companyName: string;
  tickerSymbol: string;
};

export default function StockNavM({ companyName, tickerSymbol }: Props) {
  const { isMobile, isDesktop } = useResponsiveLayout();

  const navigate = useNavigate();

  const {
    state: isStockActionDrawerOpen,
    setTrue: onStockActionDrawerOpen,
    setFalse: onStockActionDrawerClose,
  } = useBoolean();

  return (
    <>
      <StyledStockHeader $isMobile={isMobile}>
        {isMobile && (
          <ButtonsWrapperM>
            <IconButton
              icon="arrow-left"
              size="h40"
              iconColor="gray"
              onClick={() => navigate(-1)}
            />
            <IconButton
              icon="kebab-vertical"
              size="h40"
              iconColor="gray"
              onClick={onStockActionDrawerOpen}
            />
          </ButtonsWrapperM>
        )}

        <TitleWrapper $isMobile={isMobile}>
          <Title $isMobile={isMobile}>{companyName}</Title>
          <TickerSymbol>{tickerSymbol}</TickerSymbol>
        </TitleWrapper>

        {isDesktop && (
          <ButtonsWrapperD>
            <WatchlistHasStockDropdown tickerSymbol={tickerSymbol} />
            <TargetPriceAlertDropdown />
          </ButtonsWrapperD>
        )}
      </StyledStockHeader>

      {isMobile && (
        <StockActionDrawer
          tickerSymbol={tickerSymbol}
          isDrawerOpen={isStockActionDrawerOpen}
          onDrawerOpen={onStockActionDrawerOpen}
          onDrawerClose={onStockActionDrawerClose}
        />
      )}
    </>
  );
}

const StyledStockHeader = styled.header<{ $isMobile: boolean }>`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  justify-content: space-between;
  align-items: ${({ $isMobile }) => ($isMobile ? "flex-start" : "center")};
  gap: 16px;
`;

const ButtonsWrapperM = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ButtonsWrapperD = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h2<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.font
      : designSystem.font.heading2.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.heading4.letterSpacing
      : designSystem.font.heading2.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.span`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;
