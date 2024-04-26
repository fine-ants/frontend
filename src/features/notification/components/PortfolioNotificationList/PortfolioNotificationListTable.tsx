import PlainTable from "@components/Table/PlainTable";
import usePortfolioNotificationsQuery from "@features/notification/api/queries/usePortfolioNotificationSettingsQuery";
import { UserContext } from "@features/user/context/UserContext";
import { useContext } from "react";
import styled from "styled-components";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import { FeedbackCallout } from "../FeedbackCallout";
import PortfolioNotificationListTableBody from "./PortfolioNotificationListTableBody";
import PortfolioNotificationListTableHead from "./PortfolioNotificationListTableHead";

export default function PortfolioNotificationListTable() {
  const { data } = usePortfolioNotificationsQuery();
  const { user } = useContext(UserContext);

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

      <PlainTable
        tableTitle="활성 포트폴리오 알림 목록"
        initialOrderBy="createdAt"
        TableHead={PortfolioNotificationListTableHead}
        TableBody={PortfolioNotificationListTableBody}
        EmptyTable={EmptyNotificationListTable}
        data={data}
      />
    </StyledPortfolioNotificationListTable>
  );
}

const StyledPortfolioNotificationListTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
