import { postSignOut } from "@api/auth";
import { userKeys } from "@api/user/queries/queryKeys";
import Routes from "@router/Routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useSignOutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.resetQueries({
        queryKey: userKeys.details().queryKey,
        exact: true,
      });

      navigate(Routes.LANDING);
    },
  });
}
