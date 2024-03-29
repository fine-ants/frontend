import { StockSearchItem } from "@api/stock";
import useWatchlistItemAddMutation from "@api/watchlist/queries/useWatchlistItemAddMutation";

import BaseDialog from "@components/BaseDialog";
import SearchBar from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { IconButton } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddDialog({ isOpen, onClose }: Props) {
  const { watchlistId } = useParams();

  const [selectedStocks, setSelectedStocks] = useState<StockSearchItem[]>([]);

  const { mutate: watchlistItemAddMutate } = useWatchlistItemAddMutation({
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
    // TODO: 관심종목 다수 추가 API 연결
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

          <IconButton onClick={onClose}>
            <Icon icon="close" size={24} color="gray600" />
          </IconButton>
        </Header>

        <SearchBarWrapper>
          <div>종목 검색</div>
          <SearchBar
            variant="select-multiple"
            sx={{ width: "480px", marginBottom: "16px" }}
            selectedOptions={selectedStocks}
            onSelectOption={onSelectOption}
          />
        </SearchBarWrapper>

        {/* TODO: render selectedStocks */}
        {selectedStocks.length > 0 && (
          <SelectedStocksList>
            {selectedStocks.map((stock) => (
              <StockListItem key={stock.tickerSymbol}>
                <StockDetails>
                  <p>{stock.companyName}</p>
                  <p>{stock.tickerSymbol}</p>
                </StockDetails>
                <IconButton
                  onClick={() => onDeleteHoldingBoxClick(stock.tickerSymbol)}>
                  <Icon icon="close" size={16} color="blue200" />
                </IconButton>
              </StockListItem>
            ))}
          </SelectedStocksList>
        )}
      </div>

      <Button
        variant="primary"
        size="h32"
        style={{ marginLeft: "auto" }}
        disabled={selectedStocks.length === 0}
        onClick={onAddButtonClick}>
        추가
      </Button>
    </BaseDialog>
  );
}

const watchlistItemAddDialogStyles = {
  width: "544px",
  height: "605px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between" as const,
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
  padding: 16px;
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
