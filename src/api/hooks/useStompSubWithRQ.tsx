import { Client, IMessage } from "@stomp/stompjs";
import { QueryClient, QueryKey } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props<T> = {
  brokerURL: string;
  subscribeURL: string;
  queryKey: QueryKey;
  updaterFn: (oldData: T, newData: T) => T;
  initialMsg: unknown;
};

// RQ = React Query
export default function useStompSubWithRQ<T>({
  brokerURL,
  subscribeURL,
  queryKey,
  updaterFn,
  initialMsg,
}: Props<T>) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    return () => {
      stompClient?.deactivate();
    };
  }, [stompClient]);

  const onConnect = useCallback(() => {
    const client = new Client({
      brokerURL,
      onConnect: () => {
        client.subscribe(`/sub/${subscribeURL}`, (message: IMessage) => {
          queryClient.setQueryData(queryKey, (oldData: T) =>
            updaterFn(oldData, JSON.parse(message.body))
          );
        });

        client.publish({
          destination: `/pub/${subscribeURL}`,
          body: JSON.stringify(initialMsg),
        });
      },
    });

    client.activate();

    setStompClient(client);
  }, [brokerURL, initialMsg, queryClient, queryKey, subscribeURL, updaterFn]);

  const sendMessage = (body: unknown) => {
    stompClient?.publish({
      destination: subscribeURL,
      body: JSON.stringify(body),
    });
  };

  return {
    onConnect,
    sendMessage,
  };
}
