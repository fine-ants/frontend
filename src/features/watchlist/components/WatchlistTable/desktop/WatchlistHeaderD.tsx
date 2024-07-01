import Breadcrumb from "@components/Breadcrumb";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  name: string;
  onDeleteWatchlistAlertOpen: () => void;
  onNameEditDialogOpen: () => void;
};

export default function WatchlistHeaderD({
  name,
  onDeleteWatchlistAlertOpen,
  onNameEditDialogOpen,
}: Props) {
  const { watchlistId } = useParams();

  return (
    <TitleContainer>
      <Breadcrumb
        depthData={[
          { name: "전체 관심 종목 리스트", url: "/watchlists" },
          {
            name: name,
            url: Routes.WATCHLIST(watchlistId),
          },
        ]}
      />
      <TitleContent>
        <Header>
          <h1>{name}</h1>
        </Header>
        <ButtonWrapper>
          <Button
            variant="tertiary"
            size="h32"
            onClick={onDeleteWatchlistAlertOpen}
            disabled={false}>
            <Icon icon="trash" size={16} color="gray600" />
            삭제
          </Button>
          <Button
            variant="secondary"
            size="h32"
            onClick={onNameEditDialogOpen}
            disabled={false}>
            <Icon icon="edit" size={16} color="blue500" />
            이름 편집
          </Button>
        </ButtonWrapper>
      </TitleContent>
    </TitleContainer>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;

  h1 {
    font: ${designSystem.font.heading4.font};
    letter-spacing: ${designSystem.font.heading4.letterSpacing};
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
