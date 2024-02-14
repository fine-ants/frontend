import { onActivateNotification } from "@api/fcm";
import { useMemberNotificationsSettingMutation } from "@api/notifications/queries/useMemberNotificationsSettingMutation";
import { User } from "@api/user/types";
import BaseDialog from "@components/BaseDialog";
import ToggleSwitch from "@components/ToggleSwitch";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { createToast } from "@components/common/toast";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationSettingDialog({ user, isOpen, onClose }: Props) {
  const toast = createToast();

  const preferences = user.notificationPreferences;
  const NotificationPermission = Notification.permission;

  const [browserNotify, setBrowserNotify] = useState(preferences.browserNotify);
  const [maxLossNotify, setMaxLossNotify] = useState(preferences.maxLossNotify);
  const [targetGainNotify, setTargetGainNotify] = useState(
    preferences.targetGainNotify
  );
  const [targetPriceNotify, setTargetPriceNotify] = useState(
    preferences.targetPriceNotify
  );

  const { mutate } = useMemberNotificationsSettingMutation(user.id);

  const isDisabledButton =
    preferences.browserNotify === browserNotify &&
    preferences.maxLossNotify === maxLossNotify &&
    preferences.targetGainNotify === targetGainNotify &&
    preferences.targetPriceNotify === targetPriceNotify;

  const onToggleBrowserNotify = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "denied") {
      const body = {
        browserNotify: false,
        maxLossNotify,
        targetGainNotify,
        targetPriceNotify,
      };

      toast.info("알림 권한이 차단하여 데스크탑 알림을 받을 수 없습니다");
      mutate(body);

      return;
    }

    setBrowserNotify((prev) => !prev);
  };

  const onSubmit = () => {
    if (isDisabledButton) return;

    const body = {
      browserNotify,
      maxLossNotify,
      targetGainNotify,
      targetPriceNotify,
    };

    mutate(body);
    onClose();

    if (browserNotify) {
      onActivateNotification();
    }
  };

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
            {NotificationPermission === "denied" ? (
              <div>
                <ToggleTitle>알림 권한이 차단되어 있습니다</ToggleTitle>
                <ToggleTitle>
                  알림받기를 원하시면 브라우저에서 FineAnts 알림을 허용해 주세요
                </ToggleTitle>
              </div>
            ) : (
              <>
                <ToggleTitle>
                  브라우저(ex: Chrome)로 부터 데스크탑 알림 받기
                </ToggleTitle>
                <ToggleSwitch
                  onToggle={onToggleBrowserNotify}
                  isChecked={browserNotify}
                />
              </>
            )}
          </ToggleList>
        </SettingContainer>
        <Divider />
        <SettingContainer>
          <SubTitle>사용자 알림 설정</SubTitle>
          <ToggleList>
            <ToggleTitle>포트폴리오 목표 수익률 도달 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setTargetGainNotify((prev) => !prev)}
              isChecked={targetGainNotify}
            />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>포트폴리오 최대 손실율 도달 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setMaxLossNotify((prev) => !prev)}
              isChecked={maxLossNotify}
            />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>종목 지정가 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setTargetPriceNotify((prev) => !prev)}
              isChecked={targetPriceNotify}
            />
          </ToggleList>
        </SettingContainer>
        <ButtonContainer>
          <Button
            variant="primary"
            size="h32"
            disabled={isDisabledButton}
            onClick={onSubmit}>
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
