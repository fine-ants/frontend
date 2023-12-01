import { BASE_API_URL } from "@constants/config";
import { EventListener, EventSourcePolyfill } from "event-source-polyfill";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  eventTypeName: string;
};

export function useSSE<T>({ url, eventTypeName }: Props) {
  const accessToken = localStorage.getItem("accessToken");

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const eventSourceRef = useRef<EventSourcePolyfill>();

  const initEventSource = useCallback(() => {
    eventSourceRef.current = new EventSourcePolyfill(`${BASE_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [url, accessToken]);

  useEffect(() => {
    if (!eventSourceRef.current) {
      initEventSource();
      return;
    }

    const eventListener: EventListener = (event) => {
      const messageEvent = event as MessageEvent;
      const data = JSON.parse(messageEvent.data);

      setData(data);
      setIsLoading(false);
    };

    const completeListener: EventListener = () => {
      eventSourceRef.current?.close();
    };

    eventSourceRef.current.onerror = () => {
      setIsError(true);
      eventSourceRef.current?.close();
    };

    eventSourceRef.current.addEventListener(eventTypeName, eventListener);
    eventSourceRef.current?.addEventListener("complete", completeListener);

    return () => {
      eventSourceRef.current?.removeEventListener(eventTypeName, eventListener);
      eventSourceRef.current?.removeEventListener("complete", completeListener);
      eventSourceRef.current?.close();
    };
  }, [accessToken, eventTypeName, url, initEventSource]);

  const reconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current?.close();
    }

    setIsError(false);
    setIsLoading(true);
    initEventSource();
  };

  return { data, isLoading, isError, reconnect };
}
