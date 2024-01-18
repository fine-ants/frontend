import { CircularProgress, Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function PorfoliosDropdownListSkeleton() {
  return (
    <StyledPortfoliosDropdownListSkeleton>
      <CircularProgress
        sx={{
          display: "block",
          margin: "0 auto 12px auto",
          color: designSystem.color.primary.blue500,
        }}
        size={30}
      />

      <Divider />
    </StyledPortfoliosDropdownListSkeleton>
  );
}

const StyledPortfoliosDropdownListSkeleton = styled.div`
  padding-top: 8px;
`;
