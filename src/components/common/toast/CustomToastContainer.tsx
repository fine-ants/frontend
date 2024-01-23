import designSystem from "@styles/designSystem";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { CustomToastCloseButton } from "./CustomToastCloseButton";

export function CustomToastContainer() {
  return <StyledToastContainer closeButton={CustomToastCloseButton} />;
}

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    display: flex;
    width: 328px;
    height: 64px;
    padding: 0px 16px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    color: ${designSystem.color.neutral.gray800};
    font: ${designSystem.font.title5};
  }

  .Toastify__toast-icon {
    width: 24px;
    height: 24px;
  }

  .Toastify__toast--info {
    background-color: ${designSystem.color.primary.blue50};
  }

  .Toastify__toast--success {
    background-color: ${designSystem.color.state.green50};
  }

  .Toastify__toast--error {
    background-color: ${designSystem.color.state.red50};
  }

  .Toastify__toast--warning {
    background-color: ${designSystem.color.state.green50};
  }
`;
