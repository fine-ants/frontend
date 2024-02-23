import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Divider } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export default function PortfoliosDropdownListErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="secondary"
        size="h32"
        style={{ margin: "8px auto 12px auto" }}
        onClick={resetErrorBoundary}>
        <Icon icon="refresh" size={16} color="blue500" />
        <span>재시도</span>
      </Button>

      <Divider />
    </div>
  );
}
