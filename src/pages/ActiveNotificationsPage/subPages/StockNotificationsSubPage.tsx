import StockNotificationListTable from "@components/Notification/StockNotificationList/StockNotificationListTable";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { ErrorFallbackContent } from "@components/common/ErrorFallbackContent";
import TableSkeleton from "@components/common/Table/TableSkeleton";
import styled from "styled-components";

export default function StockNotificationsSubPage() {
  return (
    <StyledStockNotificationsSubPage>
      <AsyncBoundary
        SuspenseFallback={
          <TableSkeleton
            tableToolBar={false}
            tableHeadHeight={48}
            tableRowHeight={48}
          />
        }
        ErrorFallback={ErrorFallbackContent}>
        <StockNotificationListTable />
      </AsyncBoundary>
    </StyledStockNotificationsSubPage>
  );
}

const StyledStockNotificationsSubPage = styled.div`
  min-height: 300px;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
