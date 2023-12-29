import { OAuthProvider, postOAuthSignIn } from "@api/auth";
import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export default function useOAuthSignInMutation() {
  const { onSignIn } = useContext(UserContext);

  return useMutation({
    mutationFn: ({
      provider,
      authCode,
      state,
    }: {
      provider: OAuthProvider;
      authCode: string;
      state: string;
    }) => postOAuthSignIn(provider, authCode, state),
    onSuccess: ({ data }) => {
      onSignIn(data);
    },
  });
}
