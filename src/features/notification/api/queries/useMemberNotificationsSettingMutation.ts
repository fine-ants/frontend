import { getUser } from "@features/user/api";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { putMemberNotificationSettings } from "..";
import { MemberNotificationsSettings } from "../types";

export function useMemberNotificationsSettingMutation(memberId: number) {
  const navigate = useNavigate();

  const { onSignOut, onGetUser } = useContext(UserContext);

  return useMutation({
    mutationFn: (body: MemberNotificationsSettings) =>
      putMemberNotificationSettings({ memberId, body }),
    onSuccess: async () => {
      try {
        const {
          data: { user },
        } = await getUser();

        onGetUser(user);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch user data");
        onSignOut();
        navigate(Routes.SIGNIN);
      }
    },
    meta: {
      toastSuccessMessage: "알림 설정을 변경했습니다",
      toastErrorMessage: "알림 설정에 실패했습니다",
    },
  });
}
