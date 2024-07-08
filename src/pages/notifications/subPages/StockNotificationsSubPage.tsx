import { AsyncBoundary } from "@components/AsyncBoundary";
import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import TableSkeleton from "@components/Table/TableSkeleton";
import StockNotificationList from "@features/notification/components/StockNotificationList/StockNotificationList";
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
        <StockNotificationList />
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
  flex: 1;
`;
