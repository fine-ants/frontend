export const watchlistsData = [
  {
    id: 1,
    name: "My Watchlist 1",
  },
  {
    id: 2,
    name: "My Watchlist 2",
  },
];

export const watchlistData = [
  {
    id: 1,
    companyName: "삼성전자",
    tickerSymbol: "005930",
    currentPrice: 68000,
    dailyChange: 1200,
    dailyChangeRate: 1.85,
    annualDividendYield: 2.12,
    sector: "제조업",
    dateAdded: "2023-12-02T15:00:00",
  },
  {
    id: 2,
    companyName: "카카오",
    tickerSymbol: "035720",
    currentPrice: 43200,
    dailyChange: -1000,
    dailyChangeRate: -1.03,
    annualDividendYield: 0.14,
    sector: "서비스업",
    dateAdded: "2023-12-05T15:00:00",
  },
  {
    id: 3,
    companyName: "NAVER",
    tickerSymbol: "035420",
    currentPrice: 191800,
    dailyChange: -2200,
    dailyChangeRate: -2.64,
    annualDividendYield: 4.14,
    sector: "서비스업",
    dateAdded: "2023-12-05T18:00:00",
  },
  {
    id: 4,
    companyName: "현대차",
    tickerSymbol: "005380",
    currentPrice: 128000,
    dailyChange: 800,
    dailyChangeRate: 0.95,
    annualDividendYield: 3.5,
    sector: "제조업",
    dateAdded: "2023-12-10T15:00:00",
  },
  {
    id: 5,
    companyName: "LG전자",
    tickerSymbol: "066570",
    currentPrice: 81000,
    dailyChange: 2200,
    dailyChangeRate: 2.75,
    annualDividendYield: 2.43,
    sector: "제조업",
    dateAdded: "2023-12-12T15:00:00",
  },
  {
    id: 6,
    companyName: "셀트리온",
    tickerSymbol: "068270",
    currentPrice: 230000,
    dailyChange: -1100,
    dailyChangeRate: -1.9,
    annualDividendYield: 1.33,
    sector: "의약업",
    dateAdded: "2023-12-15T15:00:00",
  },
  {
    id: 7,
    companyName: "SK하이닉스",
    tickerSymbol: "000660",
    currentPrice: 95000,
    dailyChange: -900,
    dailyChangeRate: -0.86,
    annualDividendYield: 2.21,
    sector: "제조업",
    dateAdded: "2023-12-20T15:00:00",
  },
];

export const successfulGetWatchlistResponse = {
  code: 200,
  status: "OK",
  message: "관심종목 목록 조회가 완료되었습니다",
  data: watchlistData,
};

export const successfulGetWatchlistsResponse = {
  code: 200,
  status: "OK",
  message: "관심종목 목록 조회가 완료되었습니다",
  data: watchlistsData,
};
