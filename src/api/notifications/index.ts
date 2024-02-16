import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import {
  MemberNotifications,
  MemberNotificationsSettings,
  PortfolioNotification,
  PortfolioNotificationSettingsPutBody,
  StockNotification,
} from "./types";

export const postNotificationForTest = async (notification: {
  title: string;
  body: string;
  type: "stock" | "portfolio";
  referenceId: string;
}) => {
  const res = await fetcher.post<Response<null>>(
    `/members/${
      JSON.parse(localStorage.getItem("user") as string).id
    }/notifications`,
    notification
  );
  return res.data;
};

export const postFCMToken = async (fcmToken: string) => {
  const res = await fetcher.post<Response<{ fcmTokenId: number }>>(
    "/fcm/tokens",
    {
      fcmToken,
    }
  );
  return res.data;
};

export const getMemberNotifications = async (memberId: number) => {
  const res = await fetcher.get<Response<MemberNotifications[]>>(
    `/members/${memberId}/notifications`
  );
  return res.data;
};

export const patchMemberNotificationsReadAll = async ({
  memberId,
  body,
}: {
  memberId: number;
  body: number[];
}) => {
  const res = await fetcher.patch<Response<MemberNotifications>>(
    `/members/${memberId}/notifications`,
    body
  );
  return res.data;
};

export const deleteAllMemberNotification = async ({
  memberId,
  notificationIds,
}: {
  memberId: number;
  notificationIds: number[];
}) => {
  const res = await fetcher.delete<Response<MemberNotifications>>(
    `members/${memberId}/notifications`,
    { data: { notificationIds } }
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
  const res = await fetcher.delete<Response<MemberNotifications>>(
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
  const res = await fetcher.put<Response<MemberNotifications>>(
    `members/${memberId}/notification/settings`,
    body
  );
  return res.data;
};

// 종목 활성 알림
export const getStockNotificationSettings = async () => {
  const res = await fetcher.get<Response<{ stocks: StockNotification[] }>>(
    `/stocks/target-price/notifications`
  );
  return res.data;
};

export const putStockNotificationSettings = async (body: {
  tickerSymbol: string;
  isActive: boolean;
}) => {
  const res = await fetcher.put<Response<null>>(
    `/stocks/target-price/notifications`,
    body
  );
  return res.data;
};

export const postStockPriceTarget = async (body: {
  tickerSymbol: string;
  targetPrice: number;
}) => {
  const res = await fetcher.post<Response<null>>(
    `/stocks/target-price/notifications`,
    body
  );
  return res.data;
};

export const deleteAllStockPriceTargets = async (body: {
  tickerSymbol: string;
  targetPriceNotificationIds: number[];
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/stocks/target-price/notifications`,
    { data: body }
  );
  return res.data;
};

export const deleteStockPriceTarget = async ({
  tickerSymbol,
  targetNotificationId,
}: {
  tickerSymbol: string;
  targetNotificationId: number;
}) => {
  const res = await fetcher.delete<Response<null>>(
    `/stocks/target-price/notifications/${targetNotificationId}`,
    { data: { tickerSymbol } }
  );
  return res.data;
};

// 포트폴리오 활성 알림
export const getPortfolioNotificationSettings = async () => {
  const res = await fetcher.get<
    Response<{ portfolios: PortfolioNotification[] }>
  >(`/portfolios/notification/settings`);
  return res.data;
};

export const putPortfolioNotificationSettings = async ({
  portfolioId,
  notificationType,
  body,
}: {
  portfolioId: number;
  notificationType: "targetGain" | "maxLoss";
  body: PortfolioNotificationSettingsPutBody;
}) => {
  const res = await fetcher.put<Response<null>>(
    `/portfolio/${portfolioId}/notification/${notificationType}`,
    body
  );
  return res.data;
};
