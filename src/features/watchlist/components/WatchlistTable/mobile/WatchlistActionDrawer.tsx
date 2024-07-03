import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Icon } from "@components/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  onDeleteWatchlistAlertOpen: () => void;
  onNameEditDialogOpen: () => void;
};

export default function WatchlistActionDrawer({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  onDeleteWatchlistAlertOpen,
  onNameEditDialogOpen,
}: Props) {
  return (
    <BottomDrawer
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={onDrawerOpen}
      onCloseDrawer={onDrawerClose}>
      <ContentItem>
        <ContentItemButton
          onClick={() => {
            onDrawerClose();
            onNameEditDialogOpen();
          }}>
          <ContentWrapper>
            <Icon icon="edit" size={16} color="gray400" />
            <ItemTitle>편집</ItemTitle>
          </ContentWrapper>
        </ContentItemButton>
      </ContentItem>
      <ContentItem>
        <ContentItemButton
          onClick={() => {
            onDrawerClose();
            onDeleteWatchlistAlertOpen();
          }}>
          <ContentWrapper>
            <Icon icon="trash" size={16} color="gray400" />
            <ItemTitle>삭제</ItemTitle>
          </ContentWrapper>
        </ContentItemButton>
      </ContentItem>
    </BottomDrawer>
  );
}

const ContentItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ContentItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;

const ItemTitle = styled.span`
  color: ${designSystem.color.neutral.gray800};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
