import useResponsiveLayout from "@hooks/useResponsiveLayout";
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
  const { isMobile } = useResponsiveLayout();

  const baseStyle = {
    width: "100%",
    maxWidth: isMobile ? "343px" : "544px",
    height: "430px",
    padding: isMobile ? "24px" : "32px",
    backgroundColor: designSystem.color.neutral.white,
    border: `1px solid ${designSystem.color.neutral.gray100}`,
    borderRadius: "8px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
  };

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ marginInline: "16px" }}>
      <Box sx={{ ...baseStyle, ...style }}>{children}</Box>
    </Modal>
  );
}
