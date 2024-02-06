import { getUser } from "@api/user";
import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../index";

export default function useSignInMutation() {
  const navigate = useNavigate();
  const { onSignIn, onSignOut } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignIn,
    onSuccess: async ({ data: { jwt } }) => {
      try {
        const {
          data: { user },
        } = await getUser();

        onSignIn({ jwt, user });

        navigate(Routes.DASHBOARD);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        onSignOut();
        navigate(Routes.SIGNIN);
      }
    },
    meta: {
      toastErrorMessage: "이메일 또는 비밀번호가 일치하지 않습니다",
    },
  });
}
