import styled from "styled-components";
import { Icon } from "../Icon";

export function CustomToastCloseButton() {
  return (
    <CloseButtonContainer>
      <Icon icon="close" size={16} color="gray600" />
    </CloseButtonContainer>
  );
}

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
