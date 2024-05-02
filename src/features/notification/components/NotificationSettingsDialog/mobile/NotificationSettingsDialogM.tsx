import { User } from "@features/user/api/types";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
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
      TransitionComponent={Transition}>
      <NotificationSettingsContent user={user} onClose={onClose} />
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
