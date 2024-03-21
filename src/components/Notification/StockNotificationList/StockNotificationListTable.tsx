import useStockNotificationSettingsQuery from "@api/notifications/queries/useStockNotificationSettingsQuery";
import CollapsibleTable from "@components/common/Table/CollapsibleTable";
import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import styled from "styled-components";
import EmptyNotificationListTable from "../EmptyNotificationListTable";
import { FeedbackCallout } from "../FeedbackCallout";
import StockNotificationListTableBody from "./StockNotificationListTableBody";
import StockNotificationListTableHead from "./StockNotificationListTableHead";

export default function StockNotificationListTable() {
  const { data } = useStockNotificationSettingsQuery();
  const { user } = useContext(UserContext);

  return (
    <StyledStockNotificationListTable>
      {!user?.notificationPreferences.targetPriceNotify && (
        <FeedbackCallout message="종목 알림이 현재 비활성 상태입니다." />
      )}

      <CollapsibleTable
        tableTitle="활성 종목 알림 목록"
        initialOrderBy="lastUpdated"
        TableHead={StockNotificationListTableHead}
        TableBody={StockNotificationListTableBody}
        EmptyTable={EmptyNotificationListTable}
        data={data}
      />
    </StyledStockNotificationListTable>
  );
}

const StyledStockNotificationListTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
