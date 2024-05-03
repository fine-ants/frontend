import { ReactElement } from "react";
import { CustomTooltip, Props as CustomTooltipProps } from "./CustomTooltip";

type Props = {
  condition: boolean;
  tooltipProps: Omit<CustomTooltipProps, "children">;
  children: ReactElement;
};

export default function ConditionalTooltip({
  condition,
  tooltipProps,
  children,
}: Props) {
  return condition ? (
    children
  ) : (
    <CustomTooltip arrow={true} {...tooltipProps}>
      {children}
    </CustomTooltip>
  );
}
