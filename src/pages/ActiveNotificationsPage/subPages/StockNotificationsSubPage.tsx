import StockNotificationListTable from "@components/Notification/StockNotificationList/StockNotificationListTable";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
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
        // TODO: ErrorFallback
        ErrorFallback={() => <div>error</div>}>
        <StockNotificationListTable />
      </AsyncBoundary>
    </StyledStockNotificationsSubPage>
  );
}

const StyledStockNotificationsSubPage = styled.div`
  margin-top: 40px;
`;
