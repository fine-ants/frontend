import { HTTPSTATUS } from "@api/types";
import { BASE_API_URL } from "@constants/config";
import useSignOutMutation from "@features/auth/api/queries/useSignOutMutation";
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

  const { mutate: signOutMutate } = useSignOutMutation();

  const eventSourceRef = useRef<EventSource>();

  const onClose = useCallback(() => {
    setData(undefined);
    setIsLoading(true);
    setIsError(false);
    setShouldReconnect(true);

    eventSourceRef.current?.close();
  }, []);

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
    [onClose]
  );

  const initEventSource = useCallback(() => {
    eventSourceRef.current = new EventSource(`${BASE_API_URL}${url}`, {
      withCredentials: true,
    });

    eventSourceRef.current.onerror = async (errorEvent) => {
      if ((errorEvent as ErrorEvent).status === HTTPSTATUS.forbidden) {
        setIsError(true);
        setIsLoading(false);
        signOutMutate();
      }
    };

    eventSourceRef.current.addEventListener(eventTypeName, messageListener);
    eventSourceRef.current.addEventListener("complete", completeHandler);
  }, [url, eventTypeName, messageListener, completeHandler, signOutMutate]);

  const reconnect = useCallback(() => {
    onClose();
    setIsError(false);
    setIsLoading(true);
    initEventSource();
  }, [onClose, initEventSource]);

  useEffect(() => {
    if (!shouldReconnect) return;

    initEventSource();
  }, [shouldReconnect, initEventSource]);

  useEffect(() => {
    return onClose;
  }, [onClose]);

  return { data, isLoading, isError, reconnect };
}
