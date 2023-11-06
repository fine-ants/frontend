import { Box, Modal } from "@mui/material";
import { ReactNode } from "react";
import { CSSProperties } from "styled-components";

type Props = {
  style?: CSSProperties;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function BaseModal({ style, children, isOpen, onClose }: Props) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...baseStyle, ...style }}>{children}</Box>
    </Modal>
  );
}

const baseStyle = {
  width: "700px",
  height: "430px",
  backgroundColor: "#ffffff",
  border: "1px solid black",
  borderRadius: "8px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
