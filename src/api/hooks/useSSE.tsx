import { refreshAccessToken } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { BASE_API_URL } from "@constants/config";
import {
  Event,
  EventSourcePolyfill,
  MessageEvent,
} from "event-source-polyfill";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ErrorEvent = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any;
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
} & Event;

type Props = {
  url: string;
  eventTypeName: string;
};

export function useSSE<T>({ url, eventTypeName }: Props) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(true);

  const eventSourceRef = useRef<EventSourcePolyfill>();

  const messageListener = useMemo(
    () => ({
      handleEvent: (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        setData(data);
        setIsLoading(false);
      },
    }),
    []
  );

  // For when the server is indicating that there is no need to reconnect.
  const completeHandler = useMemo(
    () => ({
      handleEvent: () => {
        setIsLoading(false);
        setShouldReconnect(false);
        onClose();
      },
    }),
    []
  );

  const initEventSource = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");

    eventSourceRef.current = new EventSourcePolyfill(`${BASE_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSourceRef.current.onerror = async (errorEvent) => {
      if ((errorEvent as ErrorEvent).status === HTTPSTATUS.forbidden) {
        const res = await refreshAccessToken();

        localStorage.setItem("accessToken", res.data?.accessToken);

        setIsError(false);
        setIsLoading(true);
        initEventSource();
        return;
      }

      setIsError(true);
    };

    eventSourceRef.current.addEventListener(eventTypeName, messageListener);
    eventSourceRef.current.addEventListener("complete", completeHandler);
  }, [url, eventTypeName, messageListener, completeHandler]);

  useEffect(() => {
    if (!shouldReconnect) return;

    initEventSource();
  }, [shouldReconnect, initEventSource]);

  useEffect(() => {
    return onClose;
  }, []);

  const onClose = () => {
    eventSourceRef.current?.close();
  };

  const reconnect = () => {
    onClose();
    setIsError(false);
    setIsLoading(true);
    initEventSource();
  };

  return { data, isLoading, isError, reconnect };
}
