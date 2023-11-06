const portfolios = [
  {
    id: 3,
    securitiesFirm: "토스",
    name: "엘리엇파동12345ABC",
    budget: 1000000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    expectedMmonthlyDividend: 20000,
    numShares: 9,
  },
  {
    id: 2,
    name: "롱숏롱숏",
    budget: 1000000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    expectedMmonthlyDividend: 20000,
    numShares: 3,
  },
  {
    id: 1,
    securitiesFirm: "토스",
    name: "물린게 아니라 장기투자",
    budget: 1000000,
    totalGain: 100000,
    totalGainRate: 10,
    dailyGain: 100000,
    dailyGainRate: 10,
    expectedMmonthlyDividend: 20000,
    numShares: 12,
  },
];

export const portfolioHoldings = [
  {
    companyName: "삼성전자보통주",
    tickerSymbol: "005930",
    portfolioHoldingId: 1,
    currentValuation: 600000,
    currentPrice: 60000,
    averageCostPerShare: 50000.0,
    numShares: 10,
    dailyChange: 10000,
    dailyChangeRate: 10,
    totalGain: 100000,
    totalReturnRate: 16,
    annualDividend: 6000,
    annualDividendYield: 10,

    purchaseHistory: [
      {
        purchaseHistoryId: 3,
        purchaseDate: "2023-10-23T15:00:00",
        numShares: 3,
        purchasePricePerShare: 50000.0,
        memo: null,
      },
      {
        purchaseHistoryId: 2,
        purchaseDate: "2023-10-23T14:00:00",
        numShares: 3,
        purchasePricePerShare: 50000.0,
        memo: "더살거야",
      },
      {
        purchaseHistoryId: 1,
        purchaseDate: "2023-10-23T10:00:00",
        numShares: 4,
        purchasePricePerShare: 50000.0,
        memo: "첫구매",
      },
    ],
  },
  {
    companyName: "NAVER",
    tickerSymbol: "035420",
    portfolioHoldingId: 2,
    currentValuation: 1475200,
    currentPrice: 184400,
    averageCostPerShare: 150000.0,
    numShares: 8,
    dailyChange: 4600,
    dailyChangeRate: 2.5,
    totalGain: 275200,
    totalReturnRate: 22.93,
    annualDividend: 922,
    annualDividendYield: 0.5,

    purchaseHistory: [
      {
        purchaseHistoryId: 3,
        purchaseDate: "2023-10-23T15:00:00",
        numShares: 2,
        purchasePricePerShare: 50000.0,
        memo: null,
      },
      {
        purchaseHistoryId: 2,
        purchaseDate: "2023-10-23T14:00:00",
        numShares: 3,
        purchasePricePerShare: 50000.0,
        memo: "더살거야",
      },
      {
        purchaseHistoryId: 1,
        purchaseDate: "2023-10-23T10:00:00",
        numShares: 3,
        purchasePricePerShare: 50000.0,
        memo: "첫구매",
      },
    ],
  },
];

export const successfulGetPortfolioResponse = {
  code: 200,
  status: "OK",
  message: "포트폴리오 목록 조회가 완료되었습니다",
  data: {
    portfolios,
    hasNext: false,
    nextCursor: null,
  },
};

export const successfulGetPortfolioDetailsResponse = {
  code: 200,
  status: "OK",
  message: "포트폴리오 상세 정보 및 포트폴리오 종목 목록 조회가 완료되었습니다",
  data: {
    portfolioDetails: {},
    portfolioHoldings,
  },
};

//TODO: api portfolios로 가져오는 데이터의 값이랑 다른 상태라 상의후에 통일해야함 포스트맨 api에는 value와 fill이 없음

export const successfulPortfolioAddResponse = {
  code: 200,
  status: "OK",
  message: "포트폴리오가 추가되었습니다",
  data: null,
};

export const successfulPortfolioEditResponse = {
  code: 200,
  status: "OK",
  message: "포트폴리오가 수정되었습니다",
  data: null,
};

export const successfulPortfolioDeleteResponse = {
  code: 200,
  status: "OK",
  message: "포트폴리오 삭제가 완료되었습니다",
  data: null,
};

export const successfulPortfolioHoldingPurchaseAddResponse = {
  code: 200,
  status: "OK",
  message: "매입 이력이 추가되었습니다",
  data: null,
};

export const successfulPortfolioHoldingPurchaseEditResponse = {
  code: 200,
  status: "OK",
  message: "매입 이력이 수정되었습니다",
  data: null,
};

export const successfulPortfolioHoldingPurchaseDeleteResponse = {
  code: 200,
  status: "OK",
  message: "매입 이력이 삭제되었습니다",
  data: null,
};
