import { CustomToastContainer } from "@components/common/toast";
import { UserContext } from "@context/UserContext";
import router from "@router/router";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { fetchToken, onMessageListener } from "./firebase";

export default function App() {
  const { user } = useContext(UserContext);

  // TODO: 토글 누를 시
  fetchToken();
  // Foreground listener
  onMessageListener().then((payload) => {
    // TODO: 토스트 메시지로 띄우기 및 알림 수 증가
    // JSON.parse(payload);

    // eslint-disable-next-line no-console
    console.log(payload);
  });

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
