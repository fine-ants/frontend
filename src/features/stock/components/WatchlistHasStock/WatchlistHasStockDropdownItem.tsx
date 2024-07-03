import CheckBox from "@components/Checkbox";
import { WatchlistHasStockData } from "@features/watchlist/api";
import useWatchlistItemAddMutation from "@features/watchlist/api/queries/useWatchlistItemAddMutation";
import useWatchlistItemDeleteMutation from "@features/watchlist/api/queries/useWatchlistItemDeleteMutation";
import { MenuItem, debounce } from "@mui/material";
import designSystem from "@styles/designSystem";

type Props = {
  tickerSymbol: string;
  watchlist: WatchlistHasStockData;
};

export default function WatchlistHasStockDropdownItem({
  tickerSymbol,
  watchlist,
}: Props) {
  const { id: watchlistId, hasStock, name: watchlistName } = watchlist;
  const { mutate: watchlistItemAddMutate } =
    useWatchlistItemAddMutation(watchlistId);
  const { mutate: watchlistItemDeleteMutate } =
    useWatchlistItemDeleteMutation(watchlistId);

  const onClickDropdownItem = debounce(() => {
    if (hasStock) {
      watchlistItemDeleteMutate([tickerSymbol]);
    } else {
      watchlistItemAddMutate([tickerSymbol]);
    }
  }, 250);

  return (
    <MenuItem sx={menuItemSx} onClick={onClickDropdownItem}>
      <CheckBox size="h16" checked={hasStock} />
      {watchlistName}
    </MenuItem>
  );
}

const menuItemSx = {
  font: designSystem.font.body3.font,
  color: designSystem.color.neutral.gray900,
};
