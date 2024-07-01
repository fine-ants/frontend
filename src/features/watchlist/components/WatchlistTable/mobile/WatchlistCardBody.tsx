import RateBadge from "@components/Badges/RateBadge";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import SelectableCard from "@components/CardTable/SelectableCardTable/SelectableCard";
import { WatchlistItemType } from "@features/watchlist/api";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  visibleRows: readonly WatchlistItemType[];
  selected: readonly WatchlistItemType[];
  updateSelected: (newSelected: readonly WatchlistItemType[]) => void;
};

export default function WatchlistCardBody({
  visibleRows,
  selected,
  updateSelected,
}: Props) {
  const handleClick = (_: ChangeEvent<unknown>, id: number) => {
    const selectedItem = selected.find((item) => item.id === id);
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly WatchlistItemType[] = [];

    if (selectedItemIndex === -1) {
      // 선택이 되어있지 않은 경우, 해당 아이템을 선택 및 추가
      const targetItem = visibleRows.find((item) => item.id === id);
      newSelected = newSelected.concat(selected, targetItem ?? []);
    } else if (selectedItemIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedItemIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedItemIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedItemIndex),
        selected.slice(selectedItemIndex + 1)
      );
    }
    updateSelected(newSelected);
  };

  return (
    <StyledWatchlistCardList>
      {visibleRows.map((item, index) => (
        <WatchlistCard
          key={index}
          item={item}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </StyledWatchlistCardList>
  );
}

function WatchlistCard({
  item,
  selected,
  handleClick,
}: {
  item: WatchlistItemType;
  selected: readonly WatchlistItemType[];
  handleClick: (event: ChangeEvent<unknown>, id: number) => void;
}) {
  const {
    id,
    companyName,
    tickerSymbol,
    currentPrice,
    dailyChange,
    dailyChangeRate,
    annualDividendYield,
    sector,
  } = item;

  const isSelected = !!selected.find((item) => item.id === id);

  return (
    <SelectableCard
      isSelected={isSelected}
      onChange={(event) => handleClick(event, id)}
      CardHeader={
        <StyledLink to={`/stock/${tickerSymbol}`}>{companyName}</StyledLink>
      }
      CardBody={
        <>
          <CardItemRow title="현재가">
            <Content>₩{thousandsDelimiter(currentPrice)}</Content>
          </CardItemRow>
          <CardItemRow title="변동률">
            <ItemWrapper>
              <Content>₩{thousandsDelimiter(dailyChange)}</Content>
              <RateBadge
                size={16}
                value={dailyChangeRate}
                bgColorStatus={false}
              />
            </ItemWrapper>
          </CardItemRow>
          <CardItemRow title="배당금">
            <RateBadge
              size={16}
              value={annualDividendYield}
              bgColorStatus={false}
            />
          </CardItemRow>
          <CardItemRow title="섹터">
            <Content>{sector}</Content>
          </CardItemRow>
        </>
      }
    />
  );
}

const StyledWatchlistCardList = styled.div`
  border-top: 1px solid ${designSystem.color.neutral.gray100};
  margin-bottom: 24px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Content = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
