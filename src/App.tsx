import { CustomToastContainer } from "@components/common/toast";
import { UserContext } from "@context/UserContext";
import router from "@router/router";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

export default function App() {
  const { user } = useContext(UserContext);
  const [isLight, setIsLight] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => setIsLight(e.matches);

    matcher.addEventListener("change", onChange);
    return () => matcher.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const lightSchemeIcon = document.querySelector("link#light-scheme-icon");
    const darkSchemeIcon = document.querySelector("link#dark-scheme-icon");

    if (isLight) {
      darkSchemeIcon?.remove();
      lightSchemeIcon && document.head.append(lightSchemeIcon);
    } else {
      lightSchemeIcon?.remove();
      darkSchemeIcon && document.head.append(darkSchemeIcon);
    }
  }, [isLight]);

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
