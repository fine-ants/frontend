import { OAuthProvider, postOAuthSignIn } from "@api/auth";
import { userKeys } from "@api/user/queries/queryKeys";
import useUserQuery from "@api/user/queries/useUserQuery";
import Routes from "@router/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useOAuthSignInMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { refetch: refetchUser } = useUserQuery();

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
      localStorage.setItem("accessToken", jwt.accessToken);
      localStorage.setItem("refreshToken", jwt.refreshToken);

      try {
        await refetchUser();

        navigate(Routes.DASHBOARD);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        queryClient.removeQueries({
          queryKey: userKeys.details().queryKey,
          exact: true,
        });

        navigate(Routes.SIGNIN);
      }
    },
    meta: {
      toastErrorMessage: "이메일 또는 비밀번호가 일치하지 않습니다",
    },
  });
}
