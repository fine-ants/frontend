import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../index";

export default function useSignInMutation() {
  const navigate = useNavigate();
  const { onSignIn } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: ({ data }) => {
      onSignIn(data);
      navigate(Routes.DASHBOARD);
    },
    meta: {
      toastErrorMessage: "이메일 또는 비밀번호가 일치하지 않습니다",
    },
  });
}
