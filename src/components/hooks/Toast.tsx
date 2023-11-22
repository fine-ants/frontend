import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// TODO : 디자인에 맞게 커스터마이징
export const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
  }

  .Toastify__toast-icon {
  }

  .Toastify__toast--info {
  }

  .Toastify__toast--success {
  }

  .Toastify__toast--error {
  }

  .Toastify__toast--warning {
  }
`;

type Props = {
  type: "success" | "error" | "info" | "warning";
  message?: string;
  autoCloseDelay?: number | false;
  toastPosition?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
};

export function useShowToast({
  type,
  message,
  autoCloseDelay = 5000,
  toastPosition = "top-right",
}: Props) {
  const toastOptions = { position: toastPosition, autoClose: autoCloseDelay };
  const messages = {
    success: "성공!",
    error: "에러!",
    warning: "경고!",
    info: "정보!",
  };

  return () => toast[type](message || messages[type], toastOptions);
}
