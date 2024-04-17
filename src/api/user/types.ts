import { OAuthProvider } from "@api/auth";

export type User = {
  id: number;
  nickname: string;
  email: string;
  profileUrl: string;
  provider: OAuthProvider | "local";
  notificationPreferences: {
    browserNotify: boolean;
    targetGainNotify: boolean;
    maxLossNotify: boolean;
    targetPriceNotify: boolean;
  };
};
