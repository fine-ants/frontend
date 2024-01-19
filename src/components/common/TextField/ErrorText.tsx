import { FormHelperText } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const ErrorText = styled(FormHelperText)`
  margin: 0;
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.state.red500};
`;
