import { Skeleton } from "@mui/material";
import styled from "styled-components";

export default function SectorBarSkeleton() {
  return (
    <StyledSectorBarSkeleton>
      <div>섹터 구성</div>
      <Skeleton
        variant="rectangular"
        animation="wave"
        style={{ borderRadius: "8px" }}
      />
    </StyledSectorBarSkeleton>
  );
}

const StyledSectorBarSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 174px;
  padding: 16px 24px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
  box-shadow: 0px 0px 12px 0px #00000014;
`;
