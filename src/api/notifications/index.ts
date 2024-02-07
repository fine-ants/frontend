import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";
import {
  MemberNotifications,
  MemberNotificationsSettings,
  PortfolioNotification,
  PortfolioNotificationSettingsPutBody,
  StockNotification,
  StockNotificationSettingsPutBody,
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

// 종목 활성 알림
export const getStockNotificationSettings = async () => {
  const res = await fetcher.get<Response<{ stocks: StockNotification[] }>>(
    `/stocks/notification/settings`
  );
  return res.data;
};

export const putStockNotificationSettings = async ({
  tickerSymbol,
  body,
}: {
  tickerSymbol: string;
  body: StockNotificationSettingsPutBody;
}) => {
  const res = await fetcher.put<Response<null>>(
    `/stocks/${tickerSymbol}/target-price/notifications`,
    body
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
