import BaseDialog from "@components/BaseDialog";
import AsyncButton from "@components/Buttons/AsyncButton";
import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import SlideUpTransition from "@components/SlideUpTransition";
import { StockSearchItem } from "@features/stock/api";
import useWatchlistItemAddMutation from "@features/watchlist/api/queries/useWatchlistItemAddMutation";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import WatchlistItemAddDrawerM from "./WatchlistItemAddDrawerM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddDialogM({ isOpen, onClose }: Props) {
  const { watchlistId } = useParams();

  const [originalSelectedStocks, setOriginalSelectedStocks] = useState<
    StockSearchItem[]
  >([]);
  const [selectedStocks, setSelectedStocks] = useState<StockSearchItem[]>([]);

  const updateOriginalSelectedStocks = () => {
    setOriginalSelectedStocks(selectedStocks);
  };

  const clearSelectedStocks = () => {
    setSelectedStocks([]);
  };

  const onSelectOption = (option: StockSearchItem) => {
    setSelectedStocks((prev) => {
      const index = prev.findIndex(
        (stock) => stock.tickerSymbol === option.tickerSymbol
      );

      if (index === -1) {
        return [...prev, option];
      } else {
        return prev.filter(
          (stock) => stock.tickerSymbol !== option.tickerSymbol
        );
      }
    });
  };

  const {
    state: isDrawerOpen,
    setTrue: onDrawerOpen,
    setFalse: onDrawerClose,
  } = useBoolean();

  const onCloseDialog = () => {
    onClose();
    setOriginalSelectedStocks([]);
  };
  const {
    mutate: watchlistItemAddMutate,
    isPending: isWatchlistItemAddPending,
  } = useWatchlistItemAddMutation(Number(watchlistId), onCloseDialog);

  const onAddButtonClick = () => {
    const tickerSymbols = originalSelectedStocks.map(
      (stock) => stock.tickerSymbol
    );
    watchlistItemAddMutate(tickerSymbols);
  };

  const onDeleteHoldingBoxClick = (tickerSymbol: string) => {
    setOriginalSelectedStocks((prev) =>
      prev.filter((stock) => stock.tickerSymbol !== tickerSymbol)
    );
  };

  useEffect(() => {
    setSelectedStocks(originalSelectedStocks);
  }, [originalSelectedStocks]);

  return (
    <>
      <BaseDialog
        fullScreen
        isOpen={isOpen}
        onClose={onCloseDialog}
        TransitionComponent={SlideUpTransition}>
        <Header>
          <Title>관심 종목 추가</Title>
          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onCloseDialog}
          />
        </Header>

        <ContentWrapper>
          <SearchBarWrapper>
            <div>종목 검색</div>

            <SearchButton onClick={onDrawerOpen}>
              <Icon icon="search" size={16} color={"gray600"} />
              종목을 검색하세요
            </SearchButton>
          </SearchBarWrapper>
          <SelectedStocksListWrapper>
            {originalSelectedStocks.length > 0 && (
              <SelectedStocksList>
                {originalSelectedStocks.map((stock) => (
                  <StockListItem key={stock.tickerSymbol}>
                    <StockDetails>
                      <p>{stock.companyName}</p>
                      <p>{stock.tickerSymbol}</p>
                    </StockDetails>
                    <IconButton
                      icon="close"
                      size="h24"
                      iconColor="custom"
                      customColor={{
                        color: "blue200",
                        hoverColor: "blue50",
                      }}
                      onClick={() =>
                        onDeleteHoldingBoxClick(stock.tickerSymbol)
                      }
                    />
                  </StockListItem>
                ))}
              </SelectedStocksList>
            )}
          </SelectedStocksListWrapper>

          <AsyncButton
            variant="primary"
            size="h48"
            style={{ width: "100%", marginTop: "auto" }}
            disabled={
              originalSelectedStocks.length === 0 || isWatchlistItemAddPending
            }
            isPending={isWatchlistItemAddPending}
            onClick={onAddButtonClick}>
            추가
          </AsyncButton>
        </ContentWrapper>
      </BaseDialog>

      <WatchlistItemAddDrawerM
        originalSelectedStocks={originalSelectedStocks}
        selectedStocks={selectedStocks}
        isDrawerOpen={isDrawerOpen}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
        onSelectOption={onSelectOption}
        updateOriginalSelectedStocks={updateOriginalSelectedStocks}
        clearSelectedStocks={clearSelectedStocks}
      />
    </>
  );
}

const Header = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 16px 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  overflow: hidden;
`;

const SearchBarWrapper = styled.div`
  width: 100%;

  > div:first-of-type {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    margin-bottom: 8px;

    &::after {
      content: "*";
      margin-left: 4px;
      color: ${designSystem.color.state.red500};
    }
  }
`;

const SearchButton = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 4px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};
`;

const SelectedStocksListWrapper = styled.div`
  flex: 1;
  overflow: scroll;
`;

const SelectedStocksList = styled.ul`
  width: 100%;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  border: 1px solid ${designSystem.color.primary.blue50};
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.gray50};
  overflow: auto;
`;

const StockListItem = styled.li`
  width: 100%;
  height: 24px;
  display: flex;
`;

const StockDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  p:first-of-type {
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.primary.blue500};
  }

  p:last-of-type {
    font: ${designSystem.font.body4.font};
    color: ${designSystem.color.neutral.gray400};
  }
`;
