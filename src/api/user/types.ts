export type User = {
  id: number;
  nickname: string;
  email: string;
  profileUrl: string;
  notificationPreferences: {
    browserNotify: boolean;
    targetGainNotify: boolean;
    maxLossNotify: boolean;
    targetPriceNotify: boolean;
  };
};
