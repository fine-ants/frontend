import PullToRefresh from "@components/PullToRefresh";
import { CustomToastContainer } from "@components/Toast/CustomToastContainer";
import { setupFCMToken } from "@features/notification/fcm";
import { UserContext } from "@features/user/context/UserContext";
import router from "@router/router";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

export default function App() {
  const { user, onSubscribePushNotification } = useContext(UserContext);

  const userEnabledNotifications = Object.values(
    user?.notificationPreferences ?? []
  ).some((value) => value === true);

  if (user && userEnabledNotifications) {
    (async () => {
      const fcmTokenId = await setupFCMToken(user);
      if (fcmTokenId) {
        onSubscribePushNotification(fcmTokenId);
      }
    })();
  }

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <CustomToastContainer />
      <PullToRefresh>
        <StyledApp>
          <RouterProvider router={router(user)} />
        </StyledApp>
      </PullToRefresh>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  overflow: hidden;
`;
