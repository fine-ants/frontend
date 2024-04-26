import styled from "styled-components";
import { Icon } from "../Icon";

type AlertIconProps = {
  icon: "check" | "warning" | "close" | "info";
  bgColor: string;
};

export function CustomToastIcon({ icon, bgColor }: AlertIconProps) {
  return (
    <IconContainer $bgColor={bgColor}>
      <Icon icon={icon} size={16} color="white" />
    </IconContainer>
  );
}

const IconContainer = styled.div<{ $bgColor: string }>`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor};
`;
