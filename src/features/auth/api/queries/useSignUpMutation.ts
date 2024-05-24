import { postSignUp } from "@features/auth/api";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useSignUpMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      navigate(Routes.SIGNIN);
    },
    meta: {
      toastSuccessMessage: "회원가입이 완료되었습니다",
      toastErrorMessage: "회원가입에 실패했습니다. 다시 시도해주세요",
    },
  });
}
