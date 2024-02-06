import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ReactElement } from "react";
import styled from "styled-components";

type Props = TooltipProps & { children: ReactElement; smallPadding?: boolean };

export function CustomTooltip({ children, smallPadding, ...props }: Props) {
  return (
    <StyledCustomTooltip $smallPadding={smallPadding} {...props}>
      <div>{children}</div>
    </StyledCustomTooltip>
  );
}

const StyledCustomTooltip = styled(
  ({ className, ...props }: TooltipProps & { $smallPadding?: boolean }) => (
    <Tooltip
      {...props}
      PopperProps={{
        className,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: props.arrow ? [0, -5] : [0, -10],
            },
          },
        ],
      }}
    />
  )
)`
  pointer-events: none;

  & .${tooltipClasses.tooltip} {
    max-width: 400px;
    padding: ${({ $smallPadding }) => ($smallPadding ? "4px" : "8px")};
    background: ${designSystem.color.neutral.white};
    border: 1px solid ${designSystem.color.primary.blue100};
    border-radius: 4px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    font: ${designSystem.font.body4.font};
    color: ${designSystem.color.neutral.gray800};
  }

  & .${tooltipClasses.arrow} {
    color: ${designSystem.color.neutral.white};

    &::before {
      border: 1px solid ${designSystem.color.primary.blue100};
    }
  }
`;
