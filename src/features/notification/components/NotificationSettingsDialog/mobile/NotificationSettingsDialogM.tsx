import SlideTransition from "@components/SlideTransition";
import { User } from "@features/user/api/types";
import { Dialog } from "@mui/material";
import { NotificationSettingsContent } from "../NotificationSettingsContent";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialogM({ user, isOpen, onClose }: Props) {
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={(props) => (
        <SlideTransition direction="up" {...props} />
      )}>
      <NotificationSettingsContent user={user} onClose={onClose} />
    </Dialog>
  );
}
