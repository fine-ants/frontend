import { IconButton } from "@components/Buttons/IconButton";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WatchlistHeaderDrawer from "../WatchlistHeaderDrawer";

type Props = {
  name: string;
  onDeleteWatchlistAlertOpen: () => void;
  onNameEditDialogOpen: () => void;
};

export default function WatchlistHeaderM({
  name,
  onDeleteWatchlistAlertOpen,
  onNameEditDialogOpen,
}: Props) {
  const navigate = useNavigate();

  const {
    state: isDrawerOpen,
    setTrue: onDrawerOpen,
    setFalse: onDrawerClose,
  } = useBoolean();

  return (
    <>
      <StyledWatchlistHeader>
        <ButtonWrapper>
          <IconButton
            icon="arrow-left"
            size="h40"
            iconColor="gray"
            onClick={() => navigate(-1)}
          />
          <IconButton
            icon="kebab-vertical"
            size="h40"
            iconColor="gray"
            onClick={onDrawerOpen}
          />
        </ButtonWrapper>

        <Header>
          <h1>{name}</h1>
        </Header>
      </StyledWatchlistHeader>

      <WatchlistHeaderDrawer
        isDrawerOpen={isDrawerOpen}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
        onNameEditDialogOpen={onNameEditDialogOpen}
        onDeleteWatchlistAlertOpen={onDeleteWatchlistAlertOpen}
      />
    </>
  );
}

const StyledWatchlistHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 8px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;

  h1 {
    font: ${designSystem.font.heading4.font};
    letter-spacing: ${designSystem.font.heading4.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
