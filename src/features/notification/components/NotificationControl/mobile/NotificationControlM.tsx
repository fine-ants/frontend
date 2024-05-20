import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import { useBoolean } from "@hooks/useBoolean";
import { NotificationPanelM } from "../../NotificationPanel/mobile/NotificationPanelM";
import { ControlButton } from "../ControlButton";

type Props = {
  user: User;
  count: number;
  notifications: MemberNotification[];
  readAllNotification: () => void;
};

export function NotificationControlM({
  user,
  count,
  notifications,
  readAllNotification,
}: Props) {
  const { state: open, setTrue: setOpen, setFalse: setClose } = useBoolean();

  const onOpenPanel = () => {
    setOpen();
  };

  const onClosePanel = () => {
    readAllNotification();
    setClose();
  };

  return (
    <>
      <ControlButton count={count} onClick={onOpenPanel} />
      <NotificationPanelM
        user={user}
        open={open}
        notifications={notifications}
        onOpenPanel={onOpenPanel}
        onClosePanel={onClosePanel}
      />
    </>
  );
}
