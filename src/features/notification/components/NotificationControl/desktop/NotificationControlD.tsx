import { MemberNotification } from "@features/notification/api/types";
import { User } from "@features/user/api/types";
import { MouseEvent, useState } from "react";
import { NotificationPanelD } from "../../NotificationPanel/desktop/NotificationPanelD";
import { ControlButton } from "../ControlButton";

type Props = {
  user: User;
  count: number;
  notifications: MemberNotification[];
  readAllNotification: () => void;
};

export function NotificationControlD({
  user,
  count,
  notifications,
  readAllNotification,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    readAllNotification();
    setAnchorEl(null);
  };

  return (
    <>
      <ControlButton count={count} onClick={handleOpen} />
      <NotificationPanelD
        user={user}
        anchorEl={anchorEl}
        open={open}
        notifications={notifications}
        handleClose={handleClose}
      />
    </>
  );
}
