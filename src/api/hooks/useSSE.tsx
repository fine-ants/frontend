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

      setData(data);
      setIsLoading(false);
    };

    const completeListener: EventListener = () => {
      eventSource.close();
    };

    eventSource.onerror = (event) => {
      const state = event.target.readyState;

      // state = 0 응답받던중 에러 발생
      // state = 1 정상 처리후 다시 응답받기
      // state = 2 SSE 연결 실패
      if (state !== 1) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    eventSource.addEventListener(eventTypeName, eventListener);
    eventSource.addEventListener("complete", completeListener);

    return () => {
      eventSource.removeEventListener(eventTypeName, eventListener);
      eventSource.removeEventListener("complete", completeListener);
      eventSource.close();
    };
  }, [accessToken, eventTypeName, url]);

  return { data, isLoading, isError };
}
