import { postEmailCodeVerification } from "@api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useEmailCodeVerificationMutation() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      postEmailCodeVerification(email, code),
    retry: 0,
  });
}
