import { useEffect } from "react";

export default function TVTickerTapeWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "US 100",
        },
        {
          description: "",
          proName: "KRX:KOSPI",
        },
        {
          description: "",
          proName: "KRX:KOSDAQ",
        },
        {
          description: "",
          proName: "FX_IDC:USDKRW",
        },
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "kr",
    });

    const container = document.querySelector(
      ".tradingview-widget-container__widget"
    );
    container?.appendChild(script);

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
    </div>
  );
}
