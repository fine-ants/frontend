import { WatchlistHasStockData } from "@api/watchlist";
import useWatchlistItemAddMutation from "@api/watchlist/queries/useWatchlistItemAddMutation";
import useWatchlistItemDeleteMutation from "@api/watchlist/queries/useWatchlistItemDeleteMutation";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { DropdownItemProps } from "@components/hooks/useDropdown";
import designSystem from "@styles/designSystem";

type Props = {
  DropdownItem: ({ sx, onClick, children }: DropdownItemProps) => JSX.Element;
  tickerSymbol: string;
  watchlist: WatchlistHasStockData;
};

export default function WatchlistHasStockDropdownItem({
  DropdownItem,
  tickerSymbol,
  watchlist,
}: Props) {
  const { id: watchlistId, hasStock, name: watchlistName } = watchlist;
  const { mutate: watchlistItemAddMutate } = useWatchlistItemAddMutation({
    watchlistId,
  });
  const { mutate: watchlistItemDeleteMutate } =
    useWatchlistItemDeleteMutation(watchlistId);

  const onClickDropdownItem = () => {
    if (hasStock) {
      watchlistItemDeleteMutate([tickerSymbol]);
    } else {
      watchlistItemAddMutate([tickerSymbol]);
    }
  };

  return (
    <DropdownItem
      key={watchlistId}
      sx={fixedDropdownItemSx}
      onClick={onClickDropdownItem}>
      <CheckBox size="h16" checked={hasStock} />
      {watchlistName}
    </DropdownItem>
  );
}

const fixedDropdownItemSx = {
  font: designSystem.font.body3.font,
  color: designSystem.color.neutral.gray900,
};
