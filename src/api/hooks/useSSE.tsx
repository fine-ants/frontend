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

  const completeHandler = useMemo(
    () => ({
      handleEvent: (event: MessageEvent) => {
        const { data } = event;
        console.log("data:", data);

        setData(data);
        setIsLoading(false);
      },
    }),
    []
  );

  // const completeHandler = (eventSource: EventSource) => {
  //   const { data } = eventSource;

  //   if (data === "retry") {
  //     // 장시간이면 재연결 시도.
  //     reconnect();
  //   } else {
  //     // 장시간이 아니면 끊기.
  //     onClose();
  //   }
  // };

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
    eventSourceRef.current.addEventListener("complete", completeHandler);
  }, [url, accessToken, eventTypeName, eventListener, completeHandler]);

  useEffect(() => {
    if (eventSourceRef) {
      initEventSource();
    }
  }, [initEventSource]);

  useEffect(() => {
    return onClose;
  });

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
