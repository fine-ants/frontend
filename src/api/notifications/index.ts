import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import {
  MemberNotifications,
  MemberNotificationsSettings,
  PortfolioNotification,
} from "./types";

export const getMemberNotifications = async (memberId: number) => {
  const res = await fetcher.get<Response<MemberNotifications>>(
    `/members/${memberId}/notifications`
  );
  return res.data;
};

export const patchMemberNotificationsReadAll = async (memberId: number) => {
  const res = await fetcher.patch<Response<MemberNotifications>>(
    `/members/${memberId}/notifications`
  );
  return res.data;
};

export const deleteMemberNotificationAll = async (memberId: number) => {
  const res = await fetcher.patch<Response<MemberNotifications>>(
    `members/${memberId}/notifications`
  );
  return res.data;
};

export const deleteMemberNotification = async ({
  memberId,
  notificationId,
}: {
  memberId: number;
  notificationId: number;
}) => {
  const res = await fetcher.patch<Response<MemberNotifications>>(
    `members/${memberId}/notifications/${notificationId}`
  );
  return res.data;
};

export const putMemberNotificationSettings = async ({
  memberId,
  body,
}: {
  memberId: number;
  body: MemberNotificationsSettings;
}) => {
  const res = await fetcher.patch<Response<MemberNotifications>>(
    `members/${memberId}/notification/settings`,
    body
  );
  return res.data;
};

// 종목 활성 알림 목록
export const getPortfolioNotificationSettings = async () => {
  const res = await fetcher.get<
    Response<{ portfolios: PortfolioNotification[] }>
  >(`/portfolios/notification/settings`);
  return res.data;
};
