import CheckBox from "@components/Checkbox";
import designSystem from "@styles/designSystem";
import { ChangeEvent, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  CardHeader: ReactNode;
  CardBody?: ReactNode;
  isSelected: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function SelectableCard({
  CardHeader,
  CardBody,
  isSelected,
  onChange,
}: Props) {
  return (
    <StyledSelectableCard $isSelected={isSelected}>
      <CardHeaderWrapper>
        <CheckBox size="h20" onChange={onChange} checked={isSelected} />
        {CardHeader}
      </CardHeaderWrapper>
      {CardBody && <CardBodyWrapper>{CardBody}</CardBodyWrapper>}
    </StyledSelectableCard>
  );
}

const StyledSelectableCard = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
  background-color: ${({ $isSelected }) =>
    $isSelected ? designSystem.color.neutral.gray50 : "transparent"};
`;

const CardHeaderWrapper = styled.div`
  min-height: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const CardBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
