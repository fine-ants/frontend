import { useMutation } from "@tanstack/react-query";
import { putNewPassword } from "..";
import { settingsKeys } from "./queryKeys";

type Props = {
  onSuccess: () => void;
};

export default function usePasswordEditMutation({ onSuccess }: Props) {
  return useMutation({
    mutationKey: settingsKeys.passwordEdit().queryKey,
    mutationFn: putNewPassword,
    onSuccess,
    meta: {
      toastSuccessMessage: "비밀번호를 변경했습니다",
      toastErrorMessage: "비밀번호 변경을 실패했습니다",
    },
  });
}
