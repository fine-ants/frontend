import { postSignOut } from "@api/auth";
import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function useSignOutMutation() {
  const navigate = useNavigate();
  const { onSignOut } = useContext(UserContext);

  return useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      onSignOut();
      navigate(Routes.LANDING);
    },
  });
}
