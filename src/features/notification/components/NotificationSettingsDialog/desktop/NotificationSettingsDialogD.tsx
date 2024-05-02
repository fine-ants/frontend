import BaseDialog from "@components/BaseDialog";
import { User } from "@features/user/api/types";
import { CSSProperties } from "styled-components";
import { NotificationSettingsContent } from "../NotificationSettingsContent";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingsDialogD({ user, isOpen, onClose }: Props) {
  return (
    <BaseDialog style={dialogStyle} isOpen={isOpen} onClose={onClose}>
      <NotificationSettingsContent user={user} onClose={onClose} />
    </BaseDialog>
  );
}

const dialogStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  width: "544px",
  minHeight: "428px",
  height: "auto",
  borderRadius: "8px",
  padding: "32px",
};
