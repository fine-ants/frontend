import { MenuItem as MuiMenuItem } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default styled(MuiMenuItem)`
  height: inherit;
  padding: 0 4px;
  background-color: ${designSystem.color.neutral.white};
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};

  &:hover {
    background-color: ${designSystem.color.neutral.gray50};
  }

  &.Mui-selected,
  &.Mui-selected:hover {
    background-color: ${designSystem.color.neutral.gray50} !important;
  }
`;
