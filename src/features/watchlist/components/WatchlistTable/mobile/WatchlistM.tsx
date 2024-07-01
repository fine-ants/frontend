import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { WatchlistItemType } from "@features/watchlist/api";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import WatchlistItemAddDialog from "../../dialog/WatchlistItemAddDialog";
import { WatchlistCardTable } from "./WatchlistCardTable";
import WatchlistHeaderM from "./WatchlistHeaderM";

type Props = {
  name: string;
  watchStocks: WatchlistItemType[];
  onDeleteWatchlistConfirmOpen: () => void;
  onNameEditDialogOpen: () => void;
};

export default function WatchlistM({
  name,
  watchStocks,
  onDeleteWatchlistConfirmOpen,
  onNameEditDialogOpen,
}: Props) {
  const {
    state: isAddWatchlistDialogOpen,
    setTrue: onAddWatchlistDialogOpen,
    setFalse: onAddWatchlistDialogClose,
  } = useBoolean();

  return (
    <StyledWatchlist>
      <WatchlistHeaderM
        name={name}
        onDeleteWatchlistAlertOpen={onDeleteWatchlistConfirmOpen}
        onNameEditDialogOpen={onNameEditDialogOpen}
      />

      {watchStocks.length !== 0 && (
        <ButtonWrapper>
          <Button
            variant="primary"
            size="h40"
            onClick={onAddWatchlistDialogOpen}>
            <Icon icon="add" size={16} color="white" />
            <span>관심 종목 추가</span>
          </Button>
        </ButtonWrapper>
      )}

      <WatchlistCardTable data={watchStocks} />

      <WatchlistItemAddDialog
        isOpen={isAddWatchlistDialogOpen}
        onClose={onAddWatchlistDialogClose}
      />
    </StyledWatchlist>
  );
}

const StyledWatchlist = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 1440px;
  margin-top: 0;
  padding: 32px 0;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 16px 16px 24px;
`;
