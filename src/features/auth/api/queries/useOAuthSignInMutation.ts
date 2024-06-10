import { OAuthProvider, postOAuthSignIn } from "@features/auth/api";
import { getUser } from "@features/user/api";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();
  const { onSignOut, onGetUser } = useContext(UserContext);

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
    onSuccess: async () => {
      try {
        const {
          data: { user },
        } = await getUser();

        onGetUser(user);

        navigate(Routes.DASHBOARD);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        onSignOut();
        navigate(Routes.SIGNIN);
      }
    },
  });
}
