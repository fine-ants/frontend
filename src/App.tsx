import { UserContext } from "@context/UserContext";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "router/router";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/GlobalStyles";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />

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
