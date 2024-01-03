import { StockSearchItem } from "@api/stock";
import useStockSearchQuery from "@api/stock/queries/useStockSearchQuery";
import searchIcon from "@assets/icons/ic_search.svg";
import { Icon } from "@components/common/Icon";
import useOutsideClick from "@components/hooks/useOutsideClick";
import { useDebounce } from "@fineants/demolition";
import { IconButton } from "@mui/material";
import { splitAndIncludeDelimiter } from "@utils/delimiters";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

export type StockInfo = {
  companyName: string;
  tickerSymbol: string;
};

export default function SearchBar({
  onItemClick,
}: {
  onItemClick: (stockInfo: StockInfo) => void;
}) {
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const searchBarRef = useRef(null);

  const debouncedValue = useDebounce(value, 250);
  useOutsideClick(searchBarRef, () => setShowList(false));

  const onSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSearchBarFocus = () => {
    setShowList(true);
  };

  const onListClose = () => {
    setShowList(false);
  };

  const onRemoveSearchValue = () => {
    setValue("");
  };

  return (
    <StyledSearchBar ref={searchBarRef}>
      <Input
        value={value}
        onSearchBarChange={onSearchBarChange}
        onSearchBarFocus={onSearchBarFocus}
        onRemoveSearchValue={onRemoveSearchValue}
      />
      {showList && (
        <SearchList
          debouncedValue={debouncedValue}
          onItemClick={onItemClick}
          onListClose={onListClose}
        />
      )}
    </StyledSearchBar>
  );
}

type InputProps = {
  value: string;
  onSearchBarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchBarFocus: () => void;
  onRemoveSearchValue: () => void;
};

function Input({
  value,
  onSearchBarChange,
  onSearchBarFocus,
  onRemoveSearchValue,
}: InputProps) {
  return (
    <InputContainer>
      <img src={searchIcon} alt="search-icon" />
      <StyledInput
        type="text"
        value={value}
        placeholder="종목을 검색하세요"
        onChange={onSearchBarChange}
        onFocus={onSearchBarFocus}
      />
      {value && (
        <div style={iconCenterPosition}>
          <IconButton onClick={onRemoveSearchValue}>
            <Icon icon="close" size={16} color={"gray600"} />
          </IconButton>
        </div>
      )}
    </InputContainer>
  );
}

type SearchListProps = {
  debouncedValue: string;
  onItemClick: (stockInfo: StockInfo) => void;
  onListClose: () => void;
};

function SearchList({
  debouncedValue,
  onItemClick,
  onListClose,
}: SearchListProps) {
  const { data: searchResults } = useStockSearchQuery(debouncedValue);

  return (
    searchResults && (
      <StyledSearchList>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <SearchItem
              key={result.stockCode}
              value={debouncedValue}
              searchResult={result}
              onClick={onItemClick}
              onListClose={onListClose}
            />
          ))
        ) : (
          <div>없다</div>
        )}
      </StyledSearchList>
    )
  );
}

type SearchItemProps = {
  value: string;
  searchResult: StockSearchItem;
  onClick: (stockInfo: StockInfo) => void;
  onListClose: () => void;
};

function SearchItem({
  value,
  searchResult,
  onClick,
  onListClose,
}: SearchItemProps) {
  const onSearchItemClick = () => {
    onClick({
      companyName: searchResult.companyName,
      tickerSymbol: searchResult.tickerSymbol,
    });
    onListClose();
  };

  return (
    <StyledSearchItem onClick={onSearchItemClick}>
      <SearchItemName>
        {splitAndIncludeDelimiter(searchResult.companyName, value).map(
          (word) => (word === value ? <span>{word}</span> : word)
        )}
      </SearchItemName>
      <label>{searchResult.tickerSymbol}</label>
    </StyledSearchItem>
  );
}

const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 32px;
  padding: 0 8px;
  border-radius: 3px;
  background-color: inherit;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  display: flex;
  gap: 8px;
  align-items: center;

  &:focus-within {
    border-color: ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 16px;

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
    font: ${({ theme: { font } }) => font.body3};
  }
`;

const StyledSearchList = styled.div`
  position: absolute;
  width: 100%;
  height: 500px;
  top: 34px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  padding: 4px;
  border-radius: 3px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  font: ${({ theme: { font } }) => font.body3};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme: { color } }) => color.neutral.gray200};
    border-radius: 4px;
  }
`;

const StyledSearchItem = styled.div`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  height: 50px;
  padding: 0 8px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  font-weight: 400;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
  }

  > label {
    font: ${({ theme: { font } }) => font.body4};
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const SearchItemName = styled.div`
  display: flex;
  align-items: center;

  > span {
    color: ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const iconCenterPosition = {
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
