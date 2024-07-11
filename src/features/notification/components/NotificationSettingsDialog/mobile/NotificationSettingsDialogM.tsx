import BaseDialog from "@components/BaseDialog";
import SlideUpTransition from "@components/SlideUpTransition";
import { User } from "@features/user/api/types";
import NotificationSettingsContent from "../NotificationSettingsContent";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialogM({ user, isOpen, onClose }: Props) {
  return (
    <BaseDialog
      fullScreen
      isOpen={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}>
      <NotificationSettingsContent user={user} onClose={onClose} />
    </BaseDialog>
  );
}
