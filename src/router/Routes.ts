export default {
  LANDING: "/",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  OAUTHLOADING: "/signin/loading",
  PROFILE: (tab?: "profile" | "account") => {
    return tab ? `/settings/${tab}` : "/settings/:tab";
  },
  NOTIFICATIONS: (tab?: "stock" | "portfolio") => {
    return tab ? `/notifications/${tab}` : "/notifications/:tab";
  },
  DASHBOARD: "/dashboard",
  WATCHLISTS: "/watchlists",
  WATCHLIST: (watchlistId?: number | string) => {
    return watchlistId
      ? `/watchlists/${watchlistId}`
      : "/watchlists/:watchlistId";
  },
  PORTFOLIOS: "/portfolios",
  PORTFOLIO: (portfolioId?: number | string) => {
    return portfolioId
      ? `/portfolio/${portfolioId}`
      : "/portfolio/:portfolioId";
  },
  INDICES: (tickerSymbol?: string) => {
    return tickerSymbol ? `/indices/${tickerSymbol}` : "/indices/:tickerSymbol";
  },
  STOCK: (tickerSymbol?: string) => {
    return tickerSymbol ? `/stock/${tickerSymbol}` : "/stock/:tickerSymbol";
  },
  FALLBACK: "*",
};
