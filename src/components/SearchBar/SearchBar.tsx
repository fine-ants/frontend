import { StockSearchItem } from "@api/stock";
import useStockSearchQuery from "@api/stock/queries/useStockSearchQuery";
import searchIcon from "@assets/icons/ic_search.svg";
import { useDebounce } from "@fineants/demolition";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";

export default function SearchBar({
  onItemClick,
}: {
  onItemClick: (tickerSymbol: string) => void;
}) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 250);

  const onSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StyledSearchBar>
      <Input value={value} onSearchBarChange={onSearchBarChange} />
      <SearchList debouncedValue={debouncedValue} onItemClick={onItemClick} />
    </StyledSearchBar>
  );
}

function Input({
  value,
  onSearchBarChange,
}: {
  value: string;
  onSearchBarChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <InputContainer>
      <img src={searchIcon} alt="search-icon" />
      <StyledInput
        type="text"
        value={value}
        placeholder="종목 또는 지수 검색"
        onChange={onSearchBarChange}
      />
    </InputContainer>
  );
}

function SearchList({
  debouncedValue,
  onItemClick,
}: {
  debouncedValue: string;
  onItemClick: (tickerSymbol: string) => void;
}) {
  const { data: searchResults } = useStockSearchQuery(debouncedValue);

  return (
    searchResults && (
      <StyledSearchList>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <SearchItem
              key={result.stockCode}
              searchResult={result}
              onClick={onItemClick}
            />
          ))
        ) : (
          <div>없다</div>
        )}
      </StyledSearchList>
    )
  );
}

function SearchItem({
  searchResult,
  onClick,
}: {
  searchResult: StockSearchItem;
  onClick: (tickerSymbol: string) => void;
}) {
  return (
    <StyledSearchItem onClick={() => onClick(searchResult.tickerSymbol)}>
      {searchResult.companyName}
    </StyledSearchItem>
  );
}

const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 320px;
  height: 40px;
  padding: 12px;
  border-radius: 4px;
  background-color: inherit;
  border: 1px solid #b3b3c1;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 16px;
`;

const StyledSearchList = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
  top: 62px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  color: black;

  overflow: scroll;

  > :first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  > :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const StyledSearchItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 20px;
  background-color: white;
  font-weight: 400;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 1.5px;
    background-color: #e5e5e5;
  }
`;
