import CounterBadge from "@components/Badges/CounterBadge";
import { IconButton } from "@components/Buttons/IconButton";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  count: number;
  onClick: ((event: MouseEvent<HTMLButtonElement>) => void) | (() => void);
};

export function ControlButton({ count, onClick }: Props) {
  return (
    <StyledControlButton>
      <Wrapper>
        <IconButton
          icon="notification"
          size="h40"
          iconColor="custom"
          customColor={{
            color: "gray400",
            hoverColor: "gray800",
          }}
          onClick={onClick}
          aria-label="알림 패널 버튼"
        />
        {count > 0 && <CounterBadge count={count} />}
      </Wrapper>
    </StyledControlButton>
  );
}

const StyledControlButton = styled.div`
  width: 40px;
  height: 40px;
  padding: 4px;
  border-radius: 4px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${designSystem.color.neutral.gray800};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;
