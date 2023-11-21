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
  autoCloseDelay?: number;
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
  const toastOption = { position: toastPosition, autoClose: autoCloseDelay };

  switch (type) {
    case "success":
      return () => toast.success(message || "성공!", toastOption);
    case "error":
      return () => toast.error(message || "에러!", toastOption);
    case "warning":
      return () => toast.warning(message || "경고!", toastOption);
    case "info":
      return () => toast.info(message || "정보!", toastOption);
  }
}
