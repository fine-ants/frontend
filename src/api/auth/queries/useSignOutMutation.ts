import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { postSignOut } from "api/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";

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
