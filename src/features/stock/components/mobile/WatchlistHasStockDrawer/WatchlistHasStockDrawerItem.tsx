import CheckBox from "@components/Checkbox";
import Spinner from "@components/Spinner";
import { WatchlistHasStockData } from "@features/watchlist/api";
import useWatchlistItemAddMutation from "@features/watchlist/api/queries/useWatchlistItemAddMutation";
import useWatchlistItemDeleteMutation from "@features/watchlist/api/queries/useWatchlistItemDeleteMutation";
import { debounce, MenuItem } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  tickerSymbol: string;
  watchlist: WatchlistHasStockData;
};

export default function WatchlistHasStockDrawerItem({
  tickerSymbol,
  watchlist,
}: Props) {
  const { id: watchlistId, hasStock, name: watchlistName } = watchlist;

  const {
    mutate: watchlistItemAddMutate,
    isPending: isWatchlistItemAddMutatePending,
  } = useWatchlistItemAddMutation(watchlistId);

  const {
    mutate: watchlistItemDeleteMutate,
    isPending: isWatchlistItemDeletePending,
  } = useWatchlistItemDeleteMutation(watchlistId);

  const onClickDropdownItem = debounce(() => {
    if (hasStock) {
      watchlistItemDeleteMutate([tickerSymbol]);
    } else {
      watchlistItemAddMutate([tickerSymbol]);
    }
  }, 250);

  const isDisabled =
    isWatchlistItemAddMutatePending || isWatchlistItemDeletePending;

  return (
    <MenuItem
      sx={menuItemSx}
      disabled={isDisabled}
      onClick={onClickDropdownItem}>
      <CheckBox size="h20" checked={hasStock} />
      {watchlistName}
      {isDisabled && (
        <SpinnerWrapper>
          <Spinner size={20} />
        </SpinnerWrapper>
      )}
    </MenuItem>
  );
}

const menuItemSx = {
  "width": "100%",
  "height": "56px",
  "padding": "0 16px",
  "display": "flex",
  "alignItems": "center",
  "gap": "8px",
  "font": designSystem.font.title4.font,
  "letterSpacing": designSystem.font.title4.letterSpacing,
  "color": designSystem.color.neutral.gray900,

  "&:active": {
    backgroundColor: designSystem.color.neutral.gray50,
  },
};

const SpinnerWrapper = styled.div`
  margin-left: auto;
`;
