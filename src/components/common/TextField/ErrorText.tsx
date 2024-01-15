import { FormHelperText } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export const ErrorText = styled(FormHelperText)`
  margin: 0;
  position: absolute;
  font: ${designSystem.font.body4};
  color: ${designSystem.color.state.red};
`;
