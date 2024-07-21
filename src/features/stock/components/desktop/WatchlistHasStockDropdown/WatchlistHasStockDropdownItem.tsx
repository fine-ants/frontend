import CheckBox from "@components/Checkbox";
import Spinner from "@components/Spinner";
import { WatchlistHasStockData } from "@features/watchlist/api";
import useWatchlistItemAddMutation from "@features/watchlist/api/queries/useWatchlistItemAddMutation";
import useWatchlistItemDeleteMutation from "@features/watchlist/api/queries/useWatchlistItemDeleteMutation";
import { MenuItem, debounce } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  tickerSymbol: string;
  watchlist: WatchlistHasStockData;
};

export default function WatchlistHasStockDropdownItem({
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
      <CheckBox size="h16" checked={hasStock} />
      {watchlistName}
      {isDisabled && (
        <SpinnerWrapper>
          <Spinner size={16} />
        </SpinnerWrapper>
      )}
    </MenuItem>
  );
}

const menuItemSx = {
  width: "100%",
  height: "32px",
  display: "flex",
  alignItems: "center",
  font: designSystem.font.body3.font,
  color: designSystem.color.neutral.gray900,
};

const SpinnerWrapper = styled.div`
  height: 100%;
  margin-left: auto;
`;
