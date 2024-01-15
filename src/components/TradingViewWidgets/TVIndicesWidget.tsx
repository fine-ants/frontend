import { useEffect } from "react";

export default function TVIndicesWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "12M",
      showChart: false,
      locale: "kr",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "400",
      height: "600",
      tabs: [
        {
          title: "지수",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500",
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100",
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow 30",
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225",
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index",
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "UK 100",
            },
            {
              s: "KRX:KOSPI",
              d: "KOSPI",
            },
            {
              s: "KRX:KOSDAQ",
              d: "KOSDAQ",
            },
          ],
          originalTitle: "Indices",
        },
        {
          title: "선물",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500",
            },
            {
              s: "CME:6E1!",
              d: "Euro",
            },
            {
              s: "COMEX:GC1!",
              d: "Gold",
            },
            {
              s: "NYMEX:CL1!",
              d: "WTI Crude Oil",
            },
            {
              s: "NYMEX:NG1!",
              d: "Gas",
            },
            {
              s: "CBOT:ZC1!",
              d: "Corn",
            },
          ],
          originalTitle: "Futures",
        },
        {
          title: "채권",
          symbols: [
            {
              s: "CBOT:ZB1!",
              d: "T-Bond",
            },
            {
              s: "CBOT:UB1!",
              d: "Ultra T-Bond",
            },
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund",
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP",
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL",
            },
          ],
          originalTitle: "Bonds",
        },
        {
          title: "외환",
          symbols: [
            {
              s: "FX:EURUSD",
              d: "EUR to USD",
            },
            {
              s: "FX:GBPUSD",
              d: "GBP to USD",
            },
            {
              s: "FX:USDJPY",
              d: "USD to JPY",
            },
            {
              s: "FX:USDCHF",
              d: "USD to CHF",
            },
            {
              s: "FX:AUDUSD",
              d: "AUD to USD",
            },
            {
              s: "FX:USDCAD",
              d: "USD to CAD",
            },
          ],
          originalTitle: "Forex",
        },
      ],
    });

    const container = document.querySelector(
      ".tradingview-indices-widget-container__widget"
    );
    container?.appendChild(script);

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="tradingview-widget-container">
      <div className="tradingview-indices-widget-container__widget" />
    </div>
  );
}
