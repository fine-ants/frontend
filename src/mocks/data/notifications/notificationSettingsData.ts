export const successfulStockNotificationSettingsData = {
  code: 200,
  status: "OK",
  message: "모든 알림 조회를 성공했습니다",
  data: {
    stocks: [
      {
        companyName: "삼성전자",
        tickerSymbol: "005930",
        targetPrices: [
          {
            notificationId: 1,
            targetPrice: 80000,
            dateAdded: "2024-01-30T10:10:10",
          },
          {
            notificationId: 2,
            targetPrice: 90000,
            dateAdded: "2024-01-29T10:10:10",
          },
        ],
        lastPrice: 80000,
        lastUpdated: "2024-01-29T10:10:10",
      },
      {
        companyName: "카카오",
        tickerSymbol: "035720",
        targetPrices: [
          {
            notificationId: 3,
            targetPrice: 150000,
            dateAdded: "2024-01-28T10:10:10",
          },
        ],
        lastPrice: 150000,
        lastUpdated: "2024-01-28T10:10:10",
      },
    ],
  },
};

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

export const successfulPortfolioNotificationSettingsPutData = {
  code: 200,
  status: "OK",
  message: "알림 설정을 변경했습니다",
  data: null,
};
