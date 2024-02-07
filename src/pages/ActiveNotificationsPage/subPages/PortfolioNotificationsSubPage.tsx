import PortfolioNotificationListTable from "@components/Notification/PortfolioNotificationList/PortfolioNotificationListTable";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
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
        // TODO: ErrorFallback
        ErrorFallback={() => <div>error</div>}>
        <PortfolioNotificationListTable />
      </AsyncBoundary>
    </StyledPortfolioNotificationsSubPage>
  );
}

const StyledPortfolioNotificationsSubPage = styled.div`
  margin-top: 40px;
`;
