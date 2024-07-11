import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useZIndex } from "@hooks/useZIndex";
import { Box, Dialog, DialogProps } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import { CSSProperties } from "styled-components";

type Props = {
  style?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
} & Omit<DialogProps, "open">;

export default function BaseDialog({
  style,
  children,
  isOpen,
  onClose,
  ...rest
}: Props) {
  const { isMobile } = useResponsiveLayout();

  const { zIndex, popStack } = useZIndex(isOpen);

  const onCloseDialog = () => {
    popStack();
    onClose();
  };

  const baseStyle = {
    width: isMobile ? "100%" : "544px",
    height: isMobile ? "100vh" : "430px",
    padding: isMobile ? "0" : "32px",
    display: "flex",
    flexDirection: "column",
    border: isMobile
      ? "none"
      : `1px solid ${designSystem.color.neutral.gray100}`,
    borderRadius: isMobile ? "0" : "8px",
    backgroundColor: designSystem.color.neutral.white,
    bgcolor: "background.paper",
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onCloseDialog}
      {...rest}
      sx={{ zIndex: zIndex }}>
      <Box sx={{ ...baseStyle, ...style }}>{children}</Box>
    </Dialog>
  );
}
