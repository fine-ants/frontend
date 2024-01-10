import { BASE_API_URL } from "@constants/config";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  url: string;
  eventTypeName: string;
};

export function useSSE<T>({ url, eventTypeName }: Props) {
  const accessToken = localStorage.getItem("accessToken");

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [shouldReconnect, setShouldReconnect] = useState(true);

  const eventSourceRef = useRef<EventSourcePolyfill>();

  const messageListener = useMemo(
    () => ({
      handleEvent: (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log("normal event:", event);

        setData(data);
        setIsLoading(false);
      },
    }),
    []
  );

  // For when the server is indicating that there is no need to reconnect.
  const completeHandler = useMemo(
    () => ({
      handleEvent: (event: MessageEvent) => {
        const { data } = event;
        console.log("complete event:", event);

        setData(data);
        setIsLoading(false);
        setShouldReconnect(false);
      },
    }),
    []
  );

  const initEventSource = useCallback(() => {
    eventSourceRef.current = new EventSourcePolyfill(`${BASE_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSourceRef.current.onerror = () => {
      setIsError(true);
    };

    eventSourceRef.current.addEventListener(eventTypeName, messageListener);
    eventSourceRef.current.addEventListener("complete", completeHandler);
  }, [url, accessToken, eventTypeName, messageListener, completeHandler]);

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
