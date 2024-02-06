import { OAuthProvider, postOAuthSignIn } from "@api/auth";
import { getUser } from "@api/user";
import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();
  const { onSignIn, onSignOut } = useContext(UserContext);

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
    onSuccess: async ({ data: { jwt } }) => {
      try {
        const {
          data: { user },
        } = await getUser();

        onSignIn({ jwt, user });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        onSignOut();
        navigate(Routes.SIGNIN);
      }
    },
  });
}
