import { Box, Modal } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import { CSSProperties } from "styled-components";

type Props = {
  style?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function BaseDialog({
  style,
  children,
  isOpen,
  onClose,
}: Props) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...baseStyle, ...style }}>{children}</Box>
    </Modal>
  );
}

const baseStyle = {
  width: "700px",
  height: "430px",
  backgroundColor: designSystem.color.neutral.white,
  border: `1px solid ${designSystem.color.neutral.gray100}`,
  borderRadius: "8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};
