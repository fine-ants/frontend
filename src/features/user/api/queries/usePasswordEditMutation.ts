import { useMutation } from "@tanstack/react-query";
import { putNewPassword } from "..";

type Props = {
  onSuccess: () => void;
};

export default function usePasswordEditMutation({ onSuccess }: Props) {
  return useMutation({
    mutationFn: putNewPassword,
    onSuccess,
    meta: {
      toastSuccessMessage: "비밀번호를 변경했습니다",
      toastErrorMessage: "비밀번호 변경을 실패했습니다",
    },
  });
}
