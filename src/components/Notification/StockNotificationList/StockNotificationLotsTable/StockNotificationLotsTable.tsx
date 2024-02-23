import { StockTargetPrice } from "@api/notifications/types";
import PlainTable from "@components/common/Table/PlainTable";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import StockNotificationLotsTableBody from "./StockNotificationLotsTableBody";
import StockNoficiationLotsTableHead from "./StockNotificationLotsTableHead";

type Props = {
  data: (StockTargetPrice & { companyName: string })[];
};

export default function StockNotificationLotsTable({ data }: Props) {
  return (
    <StyledStockNotificationLotsTable>
      <Wrapper>
        <PlainTable
          tableTitle="종목 지정가 알림 목록"
          initialOrderBy="dateAdded"
          data={data}
          TableHead={StockNoficiationLotsTableHead}
          TableBody={StockNotificationLotsTableBody}
          enableTablePagination={false}
        />
      </Wrapper>
    </StyledStockNotificationLotsTable>
  );
}

const StyledStockNotificationLotsTable = styled.div`
  padding-left: 24px;
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const Wrapper = styled.div`
  width: 100%;
  padding-left: 16px;
  border-left: 1px solid ${designSystem.color.primary.blue100};
`;
