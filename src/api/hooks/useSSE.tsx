import { BASE_API_URL } from "@constants/config";
import { EventListener, EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useState } from "react";

type Props = {
  url: string;
  eventTypeName: string;
};

export function useSSE<T>({ url, eventTypeName }: Props) {
  const accessToken = localStorage.getItem("accessToken");

  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(`${BASE_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const eventListener: EventListener = (event) => {
      const messageEvent = event as MessageEvent;
      const data = JSON.parse(messageEvent.data);
      /* eslint-disable no-console */
      console.log(data);
      setData(data);
      setIsLoading(false);
    };

    eventSource.onerror = (event) => {
      /* eslint-disable no-console */
      console.log(event);
      setIsError(true);
      setIsLoading(false);
    };
    eventSource.addEventListener(eventTypeName, eventListener);

    return () => {
      eventSource.removeEventListener(eventTypeName, eventListener);
      eventSource.close();
    };
  }, [accessToken, eventTypeName, url]);

  return { data, isLoading, isError };
}
