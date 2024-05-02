import BaseDialog from "@components/BaseDialog";
import { User } from "@features/user/api/types";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { CSSProperties } from "styled-components";
import { NotificationSettingsContent } from "../NotificationSettingsContent";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialogD({ user, isOpen, onClose }: Props) {
  const { isMobile } = useResponsiveLayout();

  return (
    <BaseDialog style={dialogStyle(isMobile)} isOpen={isOpen} onClose={onClose}>
      <NotificationSettingsContent user={user} onClose={onClose} />
    </BaseDialog>
  );
}

const dialogStyle = (isMobile: boolean): CSSProperties => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    width: isMobile ? "100%" : "544px",
    minHeight: "428px",
    height: isMobile ? "100%" : "auto",
    borderRadius: isMobile ? "0" : "8px",
    padding: isMobile ? "0" : "32px",
    zIndex: isMobile ? "1600" : " 1300",
  };
};
