import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { Children, ReactNode, isValidElement } from "react";
import styled from "styled-components";

type Size = "h24" | "h32" | "h40" | "h48";

type Props = {
  size: Size;
  selectedValue: string;
  changeSelectedValue: (value: string) => void;
  children: ReactNode; // SelectDrawerOption
};

export default function SelectDrawer({ selectedValue, size, children }: Props) {
  const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();

  // console.log("selectedValue:", selectedValue);
  // console.log("children:", Children.toArray(children));
  // console.log(
  //   "children:",
  //   Children.toArray(children).map((child) => isValidElement(child) && child.props)
  // );
  const selectedChild = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.value === selectedValue
  );
  // console.log("selectedChild:", selectedChild);

  return (
    <>
      <StyledSelectDrawer $size={size} $isOpen={isOpen} onClick={onOpen}>
        <Display>
          {selectedChild}
          <Icon icon="chevron-down" size={16} color="gray600" />
        </Display>
      </StyledSelectDrawer>

      <BottomDrawer
        isDrawerOpen={isOpen}
        onOpenDrawer={onOpen}
        onCloseDrawer={onClose}>
        {children}
      </BottomDrawer>
    </>
  );
}

const StyledSelectDrawer = styled.div<{ $size: Size; $isOpen: boolean }>`
  min-width: ${({ $size }) => ($size === "h24" ? 56 : 80)}px;
  height: ${({ $size }) => $size.slice(1)}px;
  padding: 0 28px 0 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen
        ? designSystem.color.primary.blue500
        : designSystem.color.neutral.gray200};
  border-radius: ${({ $size }) => ($size === "h24" ? 2 : 3)}px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};

  &:hover {
    border-color: ${designSystem.color.primary.blue500};
  }
`;

const Display = styled.div`
  width: 100%;
  display: flex;
`;
