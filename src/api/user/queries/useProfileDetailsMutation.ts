import { UserContext } from "@context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { putProfileDetails } from "..";

export default function useProfileDetailsMutation() {
  const { onEditProfileDetails } = useContext(UserContext);

  return useMutation({
    mutationFn: putProfileDetails,
    onSuccess: (res) => {
      onEditProfileDetails(res.data.user);
    },
    meta: {
      toastSuccessMessage: "프로필 설정을 완료했습니다",
      toastErrorMessage: "프로필 설정을 실패했습니다",
    },
  });
}
