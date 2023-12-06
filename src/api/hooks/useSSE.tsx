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

  const eventSourceRef = useRef<EventSourcePolyfill>();

  const eventListener = useMemo(
    () => ({
      handleEvent: (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        setData(data);
        setIsLoading(false);
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
      onClose();
    };

    eventSourceRef.current.addEventListener(eventTypeName, eventListener);
    eventSourceRef.current?.addEventListener("complete", onClose);
  }, [accessToken, url, eventTypeName, eventListener]);

  useEffect(() => {
    if (!eventSourceRef.current) {
      initEventSource();
    }
  }, [initEventSource]);

  const onClose = () => {
    eventSourceRef.current?.close();
  };

  const reconnect = () => {
    onClose();
    setIsError(false);
    setIsLoading(true);
    initEventSource();
  };

  return { data, isLoading, isError, onClose, reconnect };
}
