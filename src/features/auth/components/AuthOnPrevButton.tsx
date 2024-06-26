import { IconButton } from "@components/Buttons/IconButton";

type Props = {
  onPrev: () => void;
};

export function AuthOnPrevButton({ onPrev }: Props) {
  return (
    <div>
      <IconButton
        icon="arrow-left"
        size="h40"
        iconColor="custom"
        customColor={{ color: "gray800", hoverColor: "gray100" }}
        onClick={onPrev}
      />
    </div>
  );
}
