import designSystem from "@styles/designSystem";
import Spinner from "../Spinner";
import Button, { ButtonProps } from "./Button";

type AsyncButtonProps = {
  isPending: boolean;
} & ButtonProps;

export default function AsyncButton({
  isPending,
  children,
  ...props
}: AsyncButtonProps) {
  return (
    <Button {...props}>
      {isPending ? (
        <Spinner
          size={calcSpinnerSize(props.size)}
          color={determineSpinnerColor(props.variant)}
        />
      ) : (
        children
      )}
    </Button>
  );
}

const calcSpinnerSize = (size: ButtonProps["size"]) => {
  switch (size) {
    case "h24":
      return 12;
    case "h32":
      return 15;
    case "h44":
      return 20;
  }
};

const determineSpinnerColor = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return designSystem.color.neutral.white;
    case "secondary":
      return designSystem.color.primary.blue200;
    case "tertiary":
      return designSystem.color.neutral.gray400;
  }
};
