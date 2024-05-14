import Button from "@components/Buttons/Button";
import ToggleSwitch from "@components/ToggleSwitch";
import { useMemberNotificationsSettingMutation } from "@features/notification/api/queries/useMemberNotificationsSettingMutation";
import {
  onActivateNotification,
  onDeactivateAllNotifications,
} from "@features/notification/fcm";
import { User } from "@features/user/api/types";
import { UserContext } from "@features/user/context/UserContext";
import { retryFn } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { useContext, useState } from "react";
import { toast } from "src/main";
import styled from "styled-components";
import { NotificationDeniedSign } from "./NotificationDeniedSign";
import { NotificationSettingsHeader } from "./NotificationSettingsHeader";

type Props = {
  user: User;
  onClose: () => void;
};

export function NotificationSettingsContent({ user, onClose }: Props) {
  const { isMobile } = useResponsiveLayout();

  const {
    fcmTokenId,
    onSubscribePushNotification,
    onUnsubscribePushNotification,
  } = useContext(UserContext);

  const { browserNotify, maxLossNotify, targetGainNotify, targetPriceNotify } =
    user.notificationPreferences;
  const notificationPermission = Notification.permission;

  const [newBrowserNotify, setNewBrowserNotify] = useState(browserNotify);
  const [newMaxLossNotify, setNewMaxLossNotify] = useState(maxLossNotify);
  const [newTargetGainNotify, setNewTargetGainNotify] =
    useState(targetGainNotify);
  const [newTargetPriceNotify, setNewTargetPriceNotify] =
    useState(targetPriceNotify);

  const {
    mutate: mutateNotificationSettings,
    mutateAsync: mutateAsyncNotificationSettings,
  } = useMemberNotificationsSettingMutation(user.id);

  const isDisabledButton =
    browserNotify === newBrowserNotify &&
    maxLossNotify === newMaxLossNotify &&
    targetGainNotify === newTargetGainNotify &&
    targetPriceNotify === newTargetPriceNotify;

  const onToggleBrowserNotify = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "denied") {
      const body = {
        browserNotify: false,
        maxLossNotify,
        targetGainNotify,
        targetPriceNotify,
        fcmTokenId,
      };

      toast.info("알림 권한이 차단하여 데스크탑 알림을 받을 수 없습니다");
      mutateNotificationSettings(body);

      return;
    }

    setNewBrowserNotify((prev) => !prev);
  };

  const onSubmit = async () => {
    if (isDisabledButton) return;

    try {
      const newSettingsBody = {
        browserNotify: newBrowserNotify,
        maxLossNotify: newMaxLossNotify,
        targetGainNotify: newTargetGainNotify,
        targetPriceNotify: newTargetPriceNotify,
        fcmTokenId,
      };

      await mutateAsyncNotificationSettings(newSettingsBody);

      try {
        const notifyValues = Object.values(newSettingsBody).filter(
          (val) => typeof val === "boolean"
        );
        const isAtleastOneActive = notifyValues.some((val) => val === true);
        const isAllInactive = notifyValues.every((val) => val === false);

        if (isAtleastOneActive) {
          // 알림 설정이 하나라도 true면 FCM에 subscribe하고 서버에 토큰 등록
          const newFCMTokenId = await retryFn<number | undefined>(
            onActivateNotification
          );
          if (newFCMTokenId) {
            onSubscribePushNotification(newFCMTokenId);
          }
        } else if (isAllInactive && fcmTokenId) {
          // 알림 설정이 모두 false라면 FCM에서 unsubscribe하고 서버에서 토큰 제거
          await retryFn(() => onDeactivateAllNotifications(fcmTokenId));
          onUnsubscribePushNotification();
          toast.success("알림 설정을 해제했습니다");
        }
      } catch (error) {
        // Rollback
        const prevSettingsBody = {
          browserNotify,
          maxLossNotify,
          targetGainNotify,
          targetPriceNotify,
          fcmTokenId,
        };
        await mutateAsyncNotificationSettings(prevSettingsBody);
        toast.error("알림 설정을 변경하는데 문제가 발생했습니다");
      }

      onClose();
    } catch (error) {
      toast.error("알림 설정을 변경하는데 문제가 발생했습니다");
    }
  };

  return (
    <>
      <NotificationSettingsHeader onClose={onClose} />
      <StyledContent>
        <SettingContainer>
          <SubTitle>데스크탑 알림 설정</SubTitle>
          {notificationPermission === "denied" ? (
            <NotificationDeniedSign />
          ) : (
            <ToggleList>
              <>
                <ToggleTitle>
                  브라우저(ex: Chrome)로 부터 데스크탑 알림 받기
                </ToggleTitle>
                <ToggleSwitch
                  onToggle={onToggleBrowserNotify}
                  isChecked={newBrowserNotify}
                />
              </>
            </ToggleList>
          )}
        </SettingContainer>

        <Divider />

        <SettingContainer>
          <SubTitle>사용자 알림 설정</SubTitle>
          <ToggleList>
            <ToggleTitle>포트폴리오 목표 수익률 도달 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setNewTargetGainNotify((prev) => !prev)}
              isChecked={newTargetGainNotify}
            />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>포트폴리오 최대 손실률 도달 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setNewMaxLossNotify((prev) => !prev)}
              isChecked={newMaxLossNotify}
            />
          </ToggleList>
          <ToggleList>
            <ToggleTitle>종목 지정가 알림</ToggleTitle>
            <ToggleSwitch
              onToggle={() => setNewTargetPriceNotify((prev) => !prev)}
              isChecked={newTargetPriceNotify}
            />
          </ToggleList>
        </SettingContainer>

        <ButtonContainer>
          <Button
            style={{ width: `${isMobile ? "100%" : "auto"}` }}
            variant="primary"
            size={isMobile ? "h48" : "h32"}
            disabled={isDisabledButton}
            onClick={onSubmit}>
            저장
          </Button>
        </ButtonContainer>
      </StyledContent>
    </>
  );
}

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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px 8px 16px;
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
  flex-grow: 1;
  align-items: end;
`;
