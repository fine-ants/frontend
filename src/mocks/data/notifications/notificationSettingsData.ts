export const successfulPortfolioNotificationSettingsData = {
  code: 200,
  status: "OK",
  message: "모든 알림 조회를 성공했습니다",
  data: {
    portfolios: [
      {
        portfolioId: 1,
        name: "포트폴리오 1",
        targetGainNotify: true,
        maxLossNotify: true,
        lastUpdated: "2024-01-29T10:10:10",
      },
      {
        portfolioId: 2,
        name: "포트폴리오 2",
        targetGainNotify: true,
        maxLossNotify: false,
        lastUpdated: "2024-01-28T10:10:10",
      },
    ],
  },
};
