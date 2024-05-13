import useStockNotificationSettingsQuery from "@features/notification/api/queries/useStockNotificationSettingsQuery";
import { UserContext } from "@features/user/context/UserContext";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { useContext } from "react";
import styled from "styled-components";
import { FeedbackCallout } from "../FeedbackCallout";
import StockNotificationListTable from "./desktop/StockNotificationListTable";
import { StockNotificationListCards } from "./mobile/StockNotificationListCards";

export default function StockNotificationList() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { user } = useContext(UserContext);
  const { data } = useStockNotificationSettingsQuery();

  return (
    <StyledStockNotificationListTable>
      {!user?.notificationPreferences.targetPriceNotify && (
        <FeedbackCallout message="종목 알림이 현재 비활성 상태입니다." />
      )}
      {isDesktop && <StockNotificationListTable data={data} />}
      {isMobile && <StockNotificationListCards data={data} />}
    </StyledStockNotificationListTable>
  );
}

const StyledStockNotificationListTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
