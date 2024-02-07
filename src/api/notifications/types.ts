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

export type StockNotificationSettingsPutBody = {
  isActive: boolean;
};

export type DeleteAllStockPriceTargetsBody = {
  targetPriceNotificationIds: number[];
};

export type PortfolioNotification = {
  portfolioId: number;
  name: string;
  targetGainNotify: boolean;
  maxLossNotify: boolean;
  lastUpdated: string;
};

export type PortfolioNotificationSettingsPutBody = {
  isActive: boolean;
};
