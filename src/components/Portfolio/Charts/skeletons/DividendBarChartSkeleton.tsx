import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function DividendBarChartSkeleton() {
  return (
    <StyledDividendBarChartSkeleton>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "semiBold" }}>
          월 배당금
        </div>
        <div style={{ fontSize: "16px" }}>단위: 만원</div>
      </div>

      <BarsContainer>
        {Array.from({ length: 12 }).map((_, idx) => (
          <BarSkeleton key={idx} variant="rectangular" />
        ))}
      </BarsContainer>
    </StyledDividendBarChartSkeleton>
  );
}

const StyledDividendBarChartSkeleton = styled.div`
  width: 600px;
  height: 300px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 12px 0px #00000014;
`;

const BarsContainer = styled.div`
  width: 100%;
  height: 188px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
`;

const BarSkeleton = styled(Skeleton)`
  width: 32px;
  height: calc(100% - 30px);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
