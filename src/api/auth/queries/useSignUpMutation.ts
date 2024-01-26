import { postSignUp } from "@api/auth";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authKeys } from "./queryKeys";

export default function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: authKeys.signUp().queryKey,
    mutationFn: postSignUp,
    onSuccess: () => {
      navigate(Routes.SIGNIN);
    },
    onError: (error) => {
      // TODO: Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    },
  });
}
