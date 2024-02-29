export const stockNotifications = [
  {
    companyName: "삼성전자",
    tickerSymbol: "005930",
    lastPrice: 80000,
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
    isActive: false,
    lastUpdated: "2024-01-29T10:10:10",
  },
  {
    companyName: "카카오",
    tickerSymbol: "035720",
    lastPrice: 150000,
    targetPrices: [
      {
        notificationId: 3,
        targetPrice: 150000,
        dateAdded: "2024-01-28T10:10:10",
      },
    ],
    isActive: true,
    lastUpdated: "2024-01-28T10:10:10",
  },
  {
    companyName: "삼성SDI보통주",
    tickerSymbol: "006400",
    lastPrice: 200000,
    targetPrices: [
      {
        notificationId: 4,
        targetPrice: 250000,
        dateAdded: "2024-01-27T10:10:10",
      },
      {
        notificationId: 5,
        targetPrice: 280000,
        dateAdded: "2024-01-27T10:10:10",
      },
    ],
  },
];

export const portfolioNotifications = [
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
];

export const successfulFCMTokenRegistrationData = {
  code: 200,
  status: "OK",
  message: "토큰을 등록했습니다",
  data: {
    fcmTokenId: 1,
  },
};

export const successfulFCMTokenDeletionData = {
  code: 200,
  status: "OK",
  message: "토큰을 제거했습니다",
  data: null,
};

export const successfulStockNotificationSettingsData = {
  code: 200,
  status: "OK",
  message: "모든 알림 조회를 성공했습니다",
  data: {
    stocks: stockNotifications,
  },
};

export const successfulSpecificStockTargetPricesData = (
  tickerSymbol: string
) => {
  const targetPrices = stockNotifications.find(
    (stock) => stock.tickerSymbol === tickerSymbol
  )?.targetPrices;

  return {
    code: 200,
    status: "OK",
    message: "해당 종목 지정가 알림 조회를 성공했습니다",
    data: {
      targetPrices,
    },
  };
};

export const successfulStockNotificationSettingsPutData = {
  code: 200,
  status: "OK",
  message: "알림 설정을 변경했습니다",
  data: null,
};

export const successfulStockPriceTargetPostData = {
  code: 201,
  status: "Created",
  message: "해당 종목 지정가 알림을 추가했습니다",
  data: null,
};

export const successfulAllStockPriceTargetsDeleteData = {
  code: 200,
  status: "OK",
  message: "해당 종목 지정가 알림을 모두 제거했습니다",
  data: null,
};

export const successfulStockPriceTargetDeleteData = {
  code: 200,
  status: "OK",
  message: "해당 종목 지정가 알림을 제거했습니다",
  data: null,
};

export const successfulPortfolioNotificationSettingsData = {
  code: 200,
  status: "OK",
  message: "모든 알림 조회를 성공했습니다",
  data: {
    portfolios: portfolioNotifications,
  },
};

export const successfulPortfolioNotificationSettingsPutData = {
  code: 200,
  status: "OK",
  message: "알림 설정을 변경했습니다",
  data: null,
};
