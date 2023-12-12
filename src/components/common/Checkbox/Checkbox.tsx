import checkIcon from "@assets/icons/ic_check.svg";
import indetIcon from "@assets/icons/ic_indet.svg";
import { Checkbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

type Size = "h16" | "h20";

type Props = {
  size: Size;
  checkType?: "check" | "indet";
} & Pick<
  CheckboxProps,
  "checked" | "disabled" | "onChange" | "inputProps" | "id"
>;

export default function CheckBox({
  size,
  checkType = "check",
  checked,
  disabled,
  onChange,
  inputProps,
}: Props) {
  return (
    <Checkbox
      sx={{}}
      icon={<UncheckedIcon $size={size} />}
      checkedIcon={<CheckedIcon $size={size} $checkType={checkType} />}
      disableRipple={true}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      inputProps={inputProps}
    />
  );
}

const getIcon = ($checkType: "check" | "indet") => {
  return $checkType === "check" ? checkIcon : indetIcon;
};

const UncheckedIcon = styled.span<{ $size: Size }>`
  width: ${({ $size }) => `${$size === "h16" ? 16 : 20}px`};
  height: ${({ $size }) => `${$size === "h16" ? 16 : 20}px`};
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray400};
  border-radius: 4px;

  .Mui-focusVisible & {
    outline: 2px auto rgba(19, 124, 189, 0.6);
    outlineoffset: 2;
  }

  input:hover ~ & {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
    border-color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  input:disabled ~ & {
    background-color: ${({ theme: { color } }) => color.neutral.gray50};
    border-color: ${({ theme: { color } }) => color.neutral.gray200};
  }
`;

const CheckedIcon = styled(UncheckedIcon)<{
  $checkType: "check" | "indet";
  $size: Size; // Add this line
}>`
  position: relative;
  background-color: ${({ theme: { color } }) => color.primary.blue500};
  border-color: ${({ theme: { color } }) => color.primary.blue500};

  &:before {
    content: "";
    width: ${({ $size }) => `${($size === "h16" ? 16 : 20) - 4}px`};
    height: ${({ $size }) => `${($size === "h16" ? 16 : 20) - 4}px`};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${({ $checkType }) => getIcon($checkType)});
    background-size: contain;
  }

  input:hover ~ & {
    background-color: ${({ theme: { color } }) => color.primary.blue700};
    border-color: ${({ theme: { color } }) => color.primary.blue700};
  }
`;
