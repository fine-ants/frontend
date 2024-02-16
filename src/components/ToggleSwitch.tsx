import { Switch as BaseSwitch, switchClasses } from "@mui/base/Switch";
import { styled } from "@mui/system";

type props = {
  onToggle: () => void;
  isChecked: boolean;
};

export default function ToggleSwitch({ onToggle, isChecked }: props) {
  return <Switch onClick={onToggle} checked={isChecked} />;
}

const Switch = styled(BaseSwitch)`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
  background: #b3c3d3;
  border-radius: 10px;
  cursor: pointer;

  & .${switchClasses.thumb} {
    display: block;
    width: 12px;
    height: 12px;
    top: 2px;
    left: 2px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchClasses.checked} {
    background: #007fff;

    & .${switchClasses.thumb} {
      left: 14px;
      background-color: #fff;
    }
  }

  &.${switchClasses.focusVisible} .${switchClasses.thumb} {
    background-color: rgb(255 255 255 / 1);
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }
`;
