import { Skeleton } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function SectorBarSkeleton() {
  return (
    <StyledSectorBarSkeleton>
      <Skeleton
        variant="rectangular"
        animation="wave"
        style={{
          borderRadius: "4px",
          backgroundColor: designSystem.color.primary.blue50,
        }}
      />
    </StyledSectorBarSkeleton>
  );
}

const StyledSectorBarSkeleton = styled.div`
  width: 400px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;
