import { FormHelperText } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const ErrorText = styled(FormHelperText)`
  color: ${designSystem.color.state.red500};
  font: ${designSystem.font.body4};
  margin: 0;
`;
