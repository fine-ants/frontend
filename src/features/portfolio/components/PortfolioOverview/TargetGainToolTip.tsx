import { IconButton } from "@components/Buttons/IconButton";
import ConditionalTooltip from "@components/Tooltips/ConditionalTooltip";

type Props = {
  targetGain: number;
  targetGainNotify: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function TargetGainToolTip({
  targetGain,
  targetGainNotify,
  disabled,
  onClick,
}: Props) {
  return (
    <ConditionalTooltip
      condition={targetGain !== 0}
      title={"포트폴리오 목표 수익률을 먼저 설정해주세요"}
      placement={"bottom-start"}>
      <div>
        <IconButton
          icon="notification"
          size="h24"
          iconColor="custom"
          customColor={{
            color: targetGainNotify ? "blue500" : "gray400",
            hoverColor: "gray50",
          }}
          disabled={disabled}
          onClick={onClick}
          aria-label="목표 수익률 알림 설정 토글"
        />
      </div>
    </ConditionalTooltip>
  );
}
