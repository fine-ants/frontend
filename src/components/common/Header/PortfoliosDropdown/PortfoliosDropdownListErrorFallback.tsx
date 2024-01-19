import Button from "@components/common/Buttons/Button";
import { Divider } from "@mui/material";
import { FallbackProps } from "react-error-boundary";

export default function PortfoliosDropdownListErrorFallback({
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      {/* TODO: Replace with retry icon */}
      <Button
        variant="secondary"
        size="h32"
        style={{ margin: "8px auto 12px auto" }}
        onClick={resetErrorBoundary}>
        재시도
      </Button>

      <Divider />
    </div>
  );
}
