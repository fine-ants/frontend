import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Icon } from "@components/Icon";
import { SecuritiesFirm, securitiesFirmLogos } from "@constants/securitiesFirm";
import designSystem from "@styles/designSystem";
import { ReactNode } from "react";
import styled from "styled-components";

type Size = "h24" | "h32" | "h40" | "h48";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  size: Size;
  selectedValue: string;
  children: ReactNode;
};

export default function SelectDrawer({
  selectedValue,
  size,
  isOpen,
  onOpen,
  onClose,
  children,
}: Props) {
  return (
    <>
      <StyledSelectDrawer $size={size} $isOpen={isOpen} onClick={onOpen}>
        <Display>
          <SecuritiesFirmWrapper>
            <SecuritiesFirmLogo
              src={securitiesFirmLogos[selectedValue as SecuritiesFirm]}
              alt={selectedValue}
            />
            <SecuritiesFirmTitle>
              {selectedValue === "FineAnts"
                ? "FineAnts (선택안함)"
                : selectedValue}
            </SecuritiesFirmTitle>
          </SecuritiesFirmWrapper>
          <Icon icon="chevron-down" size={16} color="gray600" />
        </Display>
      </StyledSelectDrawer>

      <BottomDrawer
        customStyle={{ height: "calc(100vh - 64px)" }}
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
  padding: 0 12px 0 8px;
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
  align-items: center;
  justify-content: space-between;
`;

const SecuritiesFirmWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const SecuritiesFirmLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const SecuritiesFirmTitle = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
