import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import designSystem from "@styles/designSystem";

export const SectorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    PopperProps={{
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -6], // 첫 번째 값은 수평 방향, 두 번째 값은 수직 방향
          },
        },
      ],
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    display: "flex",
    alignItems: "center",
    backgroundColor: designSystem.color.neutral.white,
    gap: "8px",
    color: designSystem.color.neutral.gray600,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${designSystem.color.neutral.gray100}`,
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",
  },
}));
