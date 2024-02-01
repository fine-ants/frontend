export const successfulStockData = {
  code: 200,
  status: "OK",
  message: "종목 검색이 완료되었습니다",
  data: [
    {
      stockCode: "KR7448730002",
      tickerSymbol: "448730",
      companyName: "삼성FN리츠보통주",
      companyNameEng: "SamsungFN REIT",
      market: "KOSPI",
    },
    {
      stockCode: "KR7006401004",
      tickerSymbol: "006405",
      companyName: "삼성SDI1우선주",
      companyNameEng: "SAMSUNG SDI(1P)",
      market: "KOSPI",
    },
    {
      stockCode: "KR7006400006",
      tickerSymbol: "006400",
      companyName: "삼성SDI보통주",
      companyNameEng: "SAMSUNG SDI CO.,LTD.",
      market: "KOSPI",
    },
    {
      stockCode: "KR7006660005",
      tickerSymbol: "006660",
      companyName: "삼성공조보통주",
      companyNameEng: "SamsungClimateControlCo.,Ltd",
      market: "KOSPI",
    },
    {
      stockCode: "KR7377630009",
      tickerSymbol: "377630",
      companyName: "삼성기업인수목적4호",
      companyNameEng: "SAMSUNG SPECIAL PURPOSE ACQUISITION 4 COMPANY",
      market: "KOSDAQ",
    },
    {
      stockCode: "KR7425290004",
      tickerSymbol: "425290",
      companyName: "삼성기업인수목적6호",
      companyNameEng: "SAMSUNG SPECIAL PURPOSE ACQUISITION 6 COMPANY",
      market: "KOSDAQ",
    },
    {
      stockCode: "KR7439250002",
      tickerSymbol: "439250",
      companyName: "삼성기업인수목적7호",
      companyNameEng: "SAMSUNG SPECIAL PURPOSE ACQUISITION 7 COMPANY",
      market: "KOSDAQ",
    },
    {
      stockCode: "KR7448740001",
      tickerSymbol: "448740",
      companyName: "삼성기업인수목적8호",
      companyNameEng: "SAMSUNG SPECIAL PURPOSE ACQUISITION 8 COMPANY",
      market: "KOSDAQ",
    },
    {
      stockCode: "KR7380320002",
      tickerSymbol: "380320",
      companyName: "삼성머스트기업인수목적5호",
      companyNameEng: "SAMSUNG MUST SPECIAL PURPOSE ACQUISITION 5 COMPANY",
      market: "KOSDAQ",
    },
    {
      stockCode: "KR702826K016",
      tickerSymbol: "02826K",
      companyName: "삼성물산1우선주(신형)",
      companyNameEng: "SAMSUNG C&T CORPORATION(1PB)",
      market: "KOSPI",
    },
  ],
};

export const InvalidSearchTermStockData = {
  code: 400,
  status: "Bad Request",
  message: "Invalid searchTerm",
  data: null,
};
