import { OAuthProvider } from "@features/auth/api";

export type User = {
  id: number;
  nickname: string;
  email: string;
  profileUrl: string | null;
  provider: OAuthProvider | "local";
  notificationPreferences: {
    browserNotify: boolean;
    targetGainNotify: boolean;
    maxLossNotify: boolean;
    targetPriceNotify: boolean;
  };
};
