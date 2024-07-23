import BottomDrawer from "@components/Drawer/BottomDrawer";
import DrawerItem from "@components/Drawer/DrawerItem";
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
      <ul>
        <DrawerItem
          onClick={() => {
            onDrawerClose();
            onNameEditDialogOpen();
          }}>
          <Icon icon="edit" size={16} color="gray400" />
          <ItemTitle>편집</ItemTitle>
        </DrawerItem>
        <DrawerItem
          onClick={() => {
            onDrawerClose();
            onDeleteWatchlistAlertOpen();
          }}>
          <Icon icon="trash" size={16} color="gray400" />
          <ItemTitle>삭제</ItemTitle>
        </DrawerItem>
      </ul>
    </BottomDrawer>
  );
}

const ItemTitle = styled.span`
  color: ${designSystem.color.neutral.gray800};
`;
