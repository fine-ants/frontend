import { SecuritiesFirm } from "@constants/securitiesFirm";

export type NotificationType = "stock" | "portfolio";

export type MemberNotification = {
  notificationId: number;
  title: string;
  body: { name: string; target: string };
  timestamp: string;
  isRead: boolean;
  type: NotificationType;
  referenceId: string;
};

export type MemberNotificationsSettings = {
  browserNotify: boolean;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  targetPriceNotify: boolean;
  fcmTokenId: number | null;
};

export type StockNotification = {
  companyName: string;
  tickerSymbol: string;
  targetPrices: StockTargetPrice[];
  lastPrice: number;
  lastUpdated: string;
  isActive: boolean;
};

export type StockTargetPrice = {
  notificationId: number;
  targetPrice: number;
  dateAdded: string;
};

export type PortfolioNotification = {
  portfolioId: number;
  securitiesFirm: SecuritiesFirm;
  name: string;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  isTargetGainSet: boolean;
  isMaxLossSet: boolean;
  createdAt: string;
};

export type PortfolioNotificationSettingsPutBody = {
  isActive: boolean;
};
