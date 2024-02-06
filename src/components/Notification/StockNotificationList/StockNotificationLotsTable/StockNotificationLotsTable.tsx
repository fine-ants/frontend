import PlainTable from "@components/common/Table/PlainTable";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { StockTargetPrice } from "../StockNotificationListTable";
import StockNotificationLotsTableBody from "./StockNotificationLotsTableBody";
import StockNoficiationLotsTableHead from "./StockNotificationLotsTableHead";

type Props = {
  data: StockTargetPrice[];
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
          EmptyTable={() => <></>}
          enableTablePagination={false}
        />
      </Wrapper>
    </StyledStockNotificationLotsTable>
  );
}

const StyledStockNotificationLotsTable = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const Wrapper = styled.div`
  width: 1336px;
`;
