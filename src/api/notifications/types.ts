export type MemberNotifications = {
  notificationId: number;
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: "stock" | "portfolio";
  referenceId: string;
}[];

export type MemberNotificationsSettings = {
  browserNotify: boolean;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  targetPriceNotify: boolean;
};

export type PortfolioNotification = {
  portfolioId: number;
  name: string;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  lastUpdated: string;
};
