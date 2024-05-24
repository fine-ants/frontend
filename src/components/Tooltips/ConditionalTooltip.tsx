import { CustomTooltip, Props as CustomTooltipProps } from "./CustomTooltip";

type Props = CustomTooltipProps & {
  condition: boolean;
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
