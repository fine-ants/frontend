import usePortfolioNotificationSettingsQuery from "@features/notification/api/queries/usePortfolioNotificationSettingsQuery";
import { UserContext } from "@features/user/context/UserContext";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useContext } from "react";
import styled from "styled-components";
import { FeedbackCallout } from "../FeedbackCallout";
import PortfolioNotificationListTable from "./desktop/PortfolioNotificationListTable";
import { PortfolioNotificationListCardTable } from "./mobile/PortfolioNotificationListCardTable";

export default function PortfolioNotificationList() {
  const { user } = useContext(UserContext);
  const { isDesktop, isMobile } = useResponsiveLayout();
  const { data } = usePortfolioNotificationSettingsQuery();

  const maxLossNotifyFeedbackText = !user?.notificationPreferences.maxLossNotify
    ? "최대 손실률"
    : "";
  const targetGainNotifyFeedbackText = !user?.notificationPreferences
    .targetGainNotify
    ? "목표 수익률"
    : "";

  const combinedFeedbackText =
    maxLossNotifyFeedbackText && targetGainNotifyFeedbackText
      ? `${maxLossNotifyFeedbackText}과 ${targetGainNotifyFeedbackText}`
      : maxLossNotifyFeedbackText || targetGainNotifyFeedbackText;

  return (
    <StyledPortfolioNotificationListTable>
      {(!user?.notificationPreferences.maxLossNotify ||
        !user?.notificationPreferences.targetGainNotify) && (
        <FeedbackCallout
          message={`${combinedFeedbackText} 알림이 현재 비활성 상태입니다.`}
        />
      )}

      {isDesktop && <PortfolioNotificationListTable data={data} />}
      {isMobile && <PortfolioNotificationListCardTable data={data} />}
    </StyledPortfolioNotificationListTable>
  );
}

const StyledPortfolioNotificationListTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
