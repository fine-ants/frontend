import PortfolioNotificationListTable from "@components/Notification/PortfolioNotificationList/PortfolioNotificationListTable";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import { ErrorFallbackContent } from "@components/common/ErrorFallbackContent";
import TableSkeleton from "@components/common/Table/TableSkeleton";
import styled from "styled-components";

export default function PortfolioNotificationsSubPage() {
  return (
    <StyledPortfolioNotificationsSubPage>
      <AsyncBoundary
        SuspenseFallback={
          <TableSkeleton
            tableToolBar={false}
            tableHeadHeight={48}
            tableRowHeight={48}
          />
        }
        ErrorFallback={ErrorFallbackContent}>
        <PortfolioNotificationListTable />
      </AsyncBoundary>
    </StyledPortfolioNotificationsSubPage>
  );
}

const StyledPortfolioNotificationsSubPage = styled.div`
  min-height: 300px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
