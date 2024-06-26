import { createToast } from "@components/Toast/createToast.tsx";
import { notificationKeys } from "@features/notification/api/queries/queryKeys.ts";
import { UserProvider } from "@features/user/context/UserContext.tsx";
import { StyledEngineProvider } from "@mui/styled-engine";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (
  import.meta.env.DEV &&
  window.location.origin === import.meta.env.VITE_API_URL_DEV
) {
  const { default: mockServiceWorker } = await import(
    "@mocks/mockSetupWorker.ts"
  );
  await mockServiceWorker.start({ onUnhandledRequest: "bypass" });
}

export const toast = createToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (_, query) => {
      if (query.meta?.toastErrorMessage) {
        toast.error(query.meta.toastErrorMessage as string);
        return;
      }
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (_, __, ___, mutation) => {
      if (mutation.meta?.toastSuccessMessage) {
        toast.success(mutation.meta.toastSuccessMessage as string);
        return;
      }
    },
    onError: (_, __, ___, mutation) => {
      if (mutation.meta?.toastErrorMessage) {
        toast.error(mutation.meta.toastErrorMessage as string);
        return;
      }
    },
  }),
});

// Member Notifications Update (Badge Count)
window.addEventListener("notification", async () => {
  setTimeout(() => {
    queryClient.invalidateQueries({
      queryKey: notificationKeys.memberNotifications.queryKey,
    });
  }, 1000);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProvider>
            <App />
          </UserProvider>
        </LocalizationProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
