import SelectableCard from "@components/CardTable/SelectableCardTable/SelectableCard";
import { WatchlistsType } from "@features/watchlist/api";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  visibleRows: readonly WatchlistsType[];
  selected: readonly WatchlistsType[];
  updateSelected: (newSelected: readonly WatchlistsType[]) => void;
};

export default function WatchlistsCardBody({
  visibleRows,
  selected,
  updateSelected,
}: Props) {
  const handleClick = (_: ChangeEvent<unknown>, id: number) => {
    const selectedItem = selected.find((item) => item.id === id);
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly WatchlistsType[] = [];

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
    <StyledWatchlistsCardBody>
      {visibleRows.map((item, index) => (
        <WatchlistsCard
          key={index}
          item={item}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </StyledWatchlistsCardBody>
  );
}

function WatchlistsCard({
  item,
  selected,
  handleClick,
}: {
  item: WatchlistsType;
  selected: readonly WatchlistsType[];
  handleClick: (event: ChangeEvent<unknown>, id: number) => void;
}) {
  const { id, name } = item;
  const isSelected = !!selected.find((item) => item.id === id);

  return (
    <SelectableCard
      CardHeader={<StyledLink to={`/watchlists/${id}`}>{name}</StyledLink>}
      isSelected={isSelected}
      onChange={(event) => handleClick(event, id)}
    />
  );
}

const StyledWatchlistsCardBody = styled.div`
  border-top: 1px solid ${designSystem.color.neutral.gray100};
  margin-bottom: 24px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;
