import SelectDrawer from "@components/SelectDrawer/SelectDrawer";
import SelectDrawerOption from "@components/SelectDrawer/SelectDrawerOption";
import {
  SECURITIES_FIRM,
  securitiesFirmLogos,
} from "@constants/securitiesFirm";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  securitiesFirm: string;
  onChangeSecuritiesFirm: (newVal: string) => void;
};

export function SecuritiesFirmSelectDrawer({
  securitiesFirm,
  onChangeSecuritiesFirm,
}: Props) {
  const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();

  const onChange = (value: string) => {
    onChangeSecuritiesFirm(value);
    onClose();
  };

  return (
    <SelectDrawer
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      size="h48"
      selectedValue={securitiesFirm}>
      <DrawerContent>
        <ContentWrapper>
          {SECURITIES_FIRM.map((option) => (
            <SelectDrawerOption
              key={option}
              value={option}
              selectedValue={securitiesFirm}
              onChange={onChange}>
              <SecuritiesFirmLogo
                src={securitiesFirmLogos[option]}
                alt={option}
              />
              <SecuritiesFirmTitle>
                {option === "FineAnts" ? "FineAnts (선택안함)" : option}
              </SecuritiesFirmTitle>
            </SelectDrawerOption>
          ))}
        </ContentWrapper>
      </DrawerContent>
    </SelectDrawer>
  );
}

const DrawerContent = styled.div`
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const SecuritiesFirmLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const SecuritiesFirmTitle = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
