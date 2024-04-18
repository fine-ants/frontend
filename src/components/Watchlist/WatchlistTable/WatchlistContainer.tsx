import useWatchlistQuery from "@api/watchlist/queries/useWatchlistQuery";
import useWatchlistsDeleteMutation from "@api/watchlist/queries/useWatchlistsDeleteMutation";
import ConfirmAlert from "@components/ConfirmAlert";
import Breadcrumb from "@components/common/Breadcrumb";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import WatchlistNameEditDialog from "../WatchlistNameEditDialog";
import WatchlistTable from "./WatchlistTable";

export default function WatchlistContainer() {
  const { watchlistId } = useParams();
  const { data: watchlistData } = useWatchlistQuery(Number(watchlistId));
  const { mutate: watchlistsDeleteMutate } = useWatchlistsDeleteMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isNameEditDialogOpen, setIsNameEditDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onDeleteWatchlistButtonClick = () => {
    setIsConfirmOpen(true);
  };

  const onDeleteWatchlistAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    watchlistsDeleteMutate([Number(watchlistId)]);
    navigate(Routes.WATCHLISTS);
  };

  const onFavoriteMarkClick = () => {
    setIsNameEditDialogOpen(true);
  };

  return (
    <Container>
      <TitleContainer>
        <Breadcrumb
          depthData={[
            { name: "전체 관심 종목 리스트", url: "/watchlists" },
            {
              name: "와치리스트id에 맞는",
              url: `/watchlists/${watchlistId}`,
            },
          ]}
        />
        <TitleContent>
          <Header>
            <h1>{watchlistData.name}</h1>
          </Header>
          <ButtonWrapper>
            <Button
              variant="tertiary"
              size="h32"
              onClick={onDeleteWatchlistButtonClick}
              disabled={false}>
              <Icon icon="trash" size={16} color="gray600" />
              삭제
            </Button>
            <Button
              variant="secondary"
              size="h32"
              onClick={onFavoriteMarkClick}
              disabled={false}>
              <Icon icon="edit" size={16} color="blue500" />
              이름 편집
            </Button>
          </ButtonWrapper>
        </TitleContent>
      </TitleContainer>
      <WatchlistTable data={watchlistData.watchStocks} />
      {isNameEditDialogOpen && (
        <WatchlistNameEditDialog
          currentWatchlistName={watchlistData.name}
          isOpen={isNameEditDialogOpen}
          onClose={() => setIsNameEditDialogOpen(false)}
        />
      )}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심 종목 목록 삭제"
          onClose={onDeleteWatchlistAlertClose}
          onConfirm={onConfirmAction}>
          <p>'{watchlistData.name}'을 삭제하시겠습니까?</p>
        </ConfirmAlert>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  h1 {
    font: ${designSystem.font.heading2.font};
    letter-spacing: ${designSystem.font.heading2.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;

const TitleContainer = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
