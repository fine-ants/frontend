import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import styled from "styled-components";
import { EmptyNotification } from "./EmptyNotification";
import { NotificationItem } from "./NotificationItem";

type Props = {
  user: User;
  notifications: MemberNotification[] | undefined;
  handleClose: () => void;
};

export function NotificationPanelContent({
  user,
  notifications,
  handleClose,
}: Props) {
  return (
    <>
      <PanelContent>
        {!notifications || notifications.length === 0 ? (
          <EmptyNotification />
        ) : (
          notifications.map((data) => (
            <NotificationItem
              key={data.notificationId}
              user={user}
              memberNotification={data}
              onClose={handleClose}
            />
          ))
        )}
      </PanelContent>
    </>
  );
}

const PanelContent = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
`;
