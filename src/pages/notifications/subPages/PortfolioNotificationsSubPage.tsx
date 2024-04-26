import { AsyncBoundary } from "@components/AsyncBoundary";
import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import TableSkeleton from "@components/Table/TableSkeleton";
import PortfolioNotificationListTable from "@features/notification/components/PortfolioNotificationList/PortfolioNotificationListTable";
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
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;