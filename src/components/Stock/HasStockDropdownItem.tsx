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

export default function HasStockDropdownItem({
  DropdownItem,
  tickerSymbol,
  watchlist,
}: Props) {
  const watchlistId = watchlist.id;
  const { mutate: watchlistItemAddMutate } = useWatchlistItemAddMutation({
    watchlistId,
  });
  const { mutate: watchlistItemDeleteMutate } =
    useWatchlistItemDeleteMutation(watchlistId);

  const onClickDropdownItem = () => {
    if (watchlist.hasStock) {
      watchlistItemDeleteMutate([tickerSymbol]);
    } else {
      watchlistItemAddMutate([tickerSymbol]);
    }
  };

  return (
    <DropdownItem
      key={watchlist.id}
      sx={fixedDropdownItemSx}
      onClick={onClickDropdownItem}>
      <CheckBox size="h16" checked={watchlist.hasStock} />
      {watchlist.name}
    </DropdownItem>
  );
}

const fixedDropdownItemSx = {
  font: designSystem.font.body3.font,
  color: designSystem.color.neutral.gray900,
};
