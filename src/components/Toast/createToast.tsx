import { colors } from "@styles/designSystem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastIcon } from "./CustomToastIcon";

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
  autoCloseDelay = 2500,
  toastPosition = "top-center",
}: Props = {}) {
  const toastOptions = {
    position: toastPosition,
    autoClose: autoCloseDelay,
    hideProgressBar: true,
  };

  const showToast = {
    success: (message: string) =>
      toast.success(message, {
        ...toastOptions,
        icon: () => <CustomToastIcon icon="check" bgColor={colors.green500} />,
      }),
    error: (message: string) =>
      toast.error(message, {
        ...toastOptions,
        icon: () => <CustomToastIcon icon="close" bgColor={colors.red500} />,
      }),
    warning: (message: string) =>
      toast.warning(message, {
        ...toastOptions,
        icon: () => (
          <CustomToastIcon icon="warning" bgColor={colors.orange500} />
        ),
      }),
    info: (message: string) =>
      toast.info(message, {
        ...toastOptions,
        icon: () => <CustomToastIcon icon="info" bgColor={colors.blue500} />,
      }),
  };

  return showToast;
}
