import { useMutation } from "@tanstack/react-query";
import { postEmailCodeVerification } from "..";

export default function useEmailCodeVerificationMutation() {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      postEmailCodeVerification(data),
    retry: 0,
  });
}
