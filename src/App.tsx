import { CustomToastContainer } from "@components/common/toast";
import { UserContext } from "@context/UserContext";
import router from "@router/router";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <CustomToastContainer />
      <StyledApp>
        <RouterProvider router={router(user)} />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: inherit;
  min-height: inherit;
  overflow: hidden;
`;
