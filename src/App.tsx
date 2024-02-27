import useUserQuery from "@api/user/queries/useUserQuery";
import { CustomToastContainer } from "@components/common/toast";
import { FCMContext } from "@context/FCMContext";
import router from "@router/router";
import GlobalStyles from "@styles/GlobalStyles";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { setupFCMToken } from "./api/fcm";

export default function App() {
  const { onSubscribePushNotification } = useContext(FCMContext);

  const { data: user } = useUserQuery();
  // eslint-disable-next-line no-console
  console.log("user rendering in App:", user);

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
