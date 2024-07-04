import { memo, useEffect, useRef } from "react";

let tvScriptLoadingPromise: Promise<void> | null = null;

type Props = {
  tickerSymbol: string;
};

function TradingViewWidget({ tickerSymbol }: Props) {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.onload = () => resolve();
        script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${tickerSymbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "kr",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;

        if (container.current) {
          container.current.appendChild(script);
        }
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (onLoadScriptRef.current) onLoadScriptRef.current();
    });

    return () => {
      onLoadScriptRef.current = null;
    };
  }, [tickerSymbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%", border: "1px solid green" }}>
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

const TradingViewWidgetMemo = memo(TradingViewWidget);

export default TradingViewWidgetMemo;
