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

  const handleOpen = () => {
    setOpen();
  };

  const handleClose = () => {
    readAllNotification();
    setClose();
  };

  return (
    <>
      <ControlButton count={count} onClick={handleOpen} />
      <NotificationPanelM
        user={user}
        open={open}
        notifications={notifications}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
}
