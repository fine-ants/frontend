import BaseDialog from "@components/BaseDialog";
import AsyncButton from "@components/Buttons/AsyncButton";
import { IconButton } from "@components/Buttons/IconButton";
import SearchBarD from "@components/SearchBar/desktop/SearchBarD";
import { StockSearchItem } from "@features/stock/api";
import useWatchlistItemAddMutation from "@features/watchlist/api/queries/useWatchlistItemAddMutation";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddDialogD({ isOpen, onClose }: Props) {
  const { watchlistId } = useParams();

  const [selectedStocks, setSelectedStocks] = useState<StockSearchItem[]>([]);

  const {
    mutate: watchlistItemAddMutate,
    isPending: isWatchlistItemAddPending,
  } = useWatchlistItemAddMutation({
    watchlistId: Number(watchlistId),
    onCloseDialog: onClose,
  });

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

  const onAddButtonClick = () => {
    const tickerSymbols = selectedStocks.map((stock) => stock.tickerSymbol);
    watchlistItemAddMutate(tickerSymbols);
  };

  const onDeleteHoldingBoxClick = (tickerSymbol: string) => {
    setSelectedStocks((prev) =>
      prev.filter((stock) => stock.tickerSymbol !== tickerSymbol)
    );
  };

  return (
    <BaseDialog
      style={watchlistItemAddDialogStyles}
      isOpen={isOpen}
      onClose={onClose}>
      <div>
        <Header>
          <Title>관심 종목 추가</Title>

          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onClose}
          />
        </Header>

        <SearchBarWrapper>
          <div>종목 검색</div>
          <SearchBarD
            variant="select-multiple"
            sx={{ width: "480px", marginBottom: "16px" }}
            selectedOptions={selectedStocks}
            onSelectOption={onSelectOption}
          />
        </SearchBarWrapper>

        {selectedStocks.length > 0 && (
          <SelectedStocksList>
            {selectedStocks.map((stock) => (
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
                  onClick={() => onDeleteHoldingBoxClick(stock.tickerSymbol)}
                />
              </StockListItem>
            ))}
          </SelectedStocksList>
        )}
      </div>

      <AsyncButton
        variant="primary"
        size="h32"
        style={{ width: "80px", marginLeft: "auto" }}
        disabled={selectedStocks.length === 0 || isWatchlistItemAddPending}
        isPending={isWatchlistItemAddPending}
        onClick={onAddButtonClick}>
        추가
      </AsyncButton>
    </BaseDialog>
  );
}

const watchlistItemAddDialogStyles: CSSProperties = {
  height: "605px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "24px",
};

const Header = styled.header`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const SearchBarWrapper = styled.div`
  width: 100%;

  > div:first-of-type {
    margin-bottom: 8px;

    &::after {
      content: "*";
      margin-left: 4px;
      color: ${designSystem.color.state.red500};
    }
  }
`;

const SelectedStocksList = styled.ul`
  width: 100%;
  max-height: 330px;
  padding: 16px 8px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  background-color: ${designSystem.color.neutral.gray50};
  border: 1px solid ${designSystem.color.primary.blue50};
  border-radius: 8px;
`;

const StockListItem = styled.li`
  width: 100%;
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
