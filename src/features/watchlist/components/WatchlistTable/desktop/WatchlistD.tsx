import { WatchlistItemType } from "@features/watchlist/api";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import WatchlistHeaderD from "./WatchlistHeaderD";
import WatchlistTable from "./WatchlistTable";

type Props = {
  name: string;
  watchStocks: WatchlistItemType[];
  onDeleteWatchlistConfirmOpen: () => void;
  onNameEditDialogOpen: () => void;
};

export default function WatchlistD({
  name,
  watchStocks,
  onDeleteWatchlistConfirmOpen,
  onNameEditDialogOpen,
}: Props) {
  return (
    <StyledWatchlist>
      <WatchlistHeaderD
        name={name}
        onDeleteWatchlistAlertOpen={onDeleteWatchlistConfirmOpen}
        onNameEditDialogOpen={onNameEditDialogOpen}
      />

      <WatchlistTable data={watchStocks} />
    </StyledWatchlist>
  );
}

const StyledWatchlist = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;
