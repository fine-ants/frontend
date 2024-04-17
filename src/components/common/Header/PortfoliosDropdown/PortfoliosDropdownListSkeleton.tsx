import Spinner from "@components/common/Spinner";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function PortfoliosDropdownListSkeleton() {
  return (
    <StyledPortfoliosDropdownListSkeleton>
      <Spinner
        size={30}
        sx={{
          display: "block",
          margin: "0 auto 12px auto",
          color: designSystem.color.primary.blue500,
        }}
      />

      <Divider />
    </StyledPortfoliosDropdownListSkeleton>
  );
}

const StyledPortfoliosDropdownListSkeleton = styled.div`
  padding-top: 8px;
`;
