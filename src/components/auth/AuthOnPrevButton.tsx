import { IconButton } from "@components/common/Buttons/IconButton";

type Props = {
  onPrev: () => void;
};

export function AuthOnPrevButton({ onPrev }: Props) {
  return (
    <div>
      <IconButton
        icon="arrow-left"
        size="h24"
        iconColor="custom"
        customColor={{ color: "gray800", hoverColor: "gray100" }}
        onClick={onPrev}
      />
    </div>
  );
}
