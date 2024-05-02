import { User } from "@features/user/api/types";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { NotificationSettingsDialogD } from "./desktop/NotificationSettingsDialogD";
import { NotificationSettingsDialogM } from "./mobile/NotificationSettingsDialogM";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialog({ user, isOpen, onClose }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && (
        <NotificationSettingsDialogD
          user={user}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {isMobile && (
        <NotificationSettingsDialogM
          user={user}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
