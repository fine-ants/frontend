import ConfirmAlert from "@components/ConfirmAlert";
import useWatchlistQuery from "@features/watchlist/api/queries/useWatchlistQuery";
import useWatchlistsDeleteMutation from "@features/watchlist/api/queries/useWatchlistsDeleteMutation";
import { useBoolean } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import Routes from "@router/Routes";
import { useNavigate, useParams } from "react-router-dom";
import WatchlistNameEditDialog from "../dialog/WatchlistNameEditDialog";
import WatchlistD from "./desktop/WatchlistD";
import WatchlistM from "./mobile/WatchlistM";

export default function Watchlist() {
  const navigate = useNavigate();
  const { watchlistId } = useParams();

  const { isDesktop, isMobile } = useResponsiveLayout();

  const { data: watchlistData } = useWatchlistQuery(Number(watchlistId));
  const { name, watchStocks } = watchlistData;

  const { mutate: watchlistsDeleteMutate } = useWatchlistsDeleteMutation();

  const {
    state: isConfirmOpen,
    setTrue: onDeleteWatchlistConfirmOpen,
    setFalse: onDeleteWatchlistConfirmClose,
  } = useBoolean();
  const {
    state: isNameEditDialogOpen,
    setTrue: onNameEditDialogOpen,
    setFalse: onNameEditDialogClose,
  } = useBoolean();

  const onConfirmAction = () => {
    watchlistsDeleteMutate([Number(watchlistId)]);
    navigate(Routes.WATCHLISTS);
  };

  return (
    <>
      {isDesktop && (
        <WatchlistD
          name={name}
          watchStocks={watchStocks}
          onDeleteWatchlistConfirmOpen={onDeleteWatchlistConfirmOpen}
          onNameEditDialogOpen={onNameEditDialogOpen}
        />
      )}

      {isMobile && (
        <WatchlistM
          name={name}
          watchStocks={watchStocks}
          onDeleteWatchlistConfirmOpen={onDeleteWatchlistConfirmOpen}
          onNameEditDialogOpen={onNameEditDialogOpen}
        />
      )}

      <WatchlistNameEditDialog
        currentWatchlistName={name}
        isOpen={isNameEditDialogOpen}
        onClose={onNameEditDialogClose}
      />

      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심 종목 리스트 삭제"
          onClose={onDeleteWatchlistConfirmClose}
          onConfirm={onConfirmAction}>
          <p>'{name}' 관심 종목 리스트를 삭제하시겠습니까?</p>
        </ConfirmAlert>
      )}
    </>
  );
}
