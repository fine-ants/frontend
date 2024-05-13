import { ReactElement } from "react";
import { CustomTooltip, Props as CustomTooltipProps } from "./CustomTooltip";

type TooltipProps = Omit<CustomTooltipProps, "children">;

type Props = TooltipProps & {
  condition: boolean;
  children: ReactElement;
};

export default function ConditionalTooltip({
  condition,
  children,
  ...tooltipProps
}: Props) {
  return condition ? (
    children
  ) : (
    <CustomTooltip arrow={true} {...tooltipProps}>
      {children}
    </CustomTooltip>
  );
}
