import BaseDialog from "@components/BaseDialog";
import ToggleSwitch from "@components/ToggleSwitch";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// TODO : api 적용 후 삭제
const data = {
  browserNotify: true,
  targetGainNotify: true,
  maxLossNotify: true,
  targetPriceNotify: false,
};

export function NotificationSettingDialog({ isOpen, onClose }: Props) {
  // TODO : api 적용하며 toggle 로직 구현

  return (
    <BaseDialog style={dialogStyle} isOpen={isOpen} onClose={onClose}>
      <StyledHeader>
        <Title>알림 설정</Title>
        <button onClick={onClose}>
          <Icon icon="close" color="gray600" size={24} />
        </button>
      </StyledHeader>
      <StyledContent>
        <SettingContainer>
          <SubTitle>데스크탑 알림 설정</SubTitle>
          <ToggleList>
            <ToggleTitle>
              브라우저(ex: Chrome)로 부터 데스크탑 알림 받기
            </ToggleTitle>
            <ToggleSwitch onToggle={() => {}} isChecked={data.browserNotify} />
          </ToggleList>
        </SettingContainer>
        <Divider />
        <SettingContainer>
          <SubTitle>사용자 알림 설정</SubTitle>
          <ToggleList>
            <ToggleTitle>포트폴리오 목표 수익률 도달 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => {}}
              isChecked={data.targetGainNotify}
            />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>포트폴리오 최대 손실율 도달 알림</ToggleTitle>
            <ToggleSwitch onToggle={() => {}} isChecked={data.maxLossNotify} />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>종목 지정가 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => {}}
              isChecked={data.targetPriceNotify}
            />
          </ToggleList>
        </SettingContainer>
        <ButtonContainer>
          <Button variant="primary" size="h32">
            저장
          </Button>
        </ButtonContainer>
      </StyledContent>
    </BaseDialog>
  );
}

const dialogStyle = {
  width: "544px",
  height: "428px",
};

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const SubTitle = styled.div`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const ToggleList = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  gap: 24px;
`;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray200};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
