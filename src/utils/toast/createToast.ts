import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  autoCloseDelay?: number | false;
  toastPosition?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
};

export function createToast({
  autoCloseDelay = 5000,
  toastPosition = "top-right",
}: Props = {}) {
  const toastOptions = { position: toastPosition, autoClose: autoCloseDelay };

  const showToast = {
    success: (message: string) => toast.success(message, toastOptions),
    error: (message: string) => toast.error(message, toastOptions),
    warning: (message: string) => toast.warning(message, toastOptions),
    info: (message: string) => toast.info(message, toastOptions),
  };

  return showToast;
}
