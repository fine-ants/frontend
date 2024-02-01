import React, { useEffect, useRef, useState } from "react";

let tvScriptLoadingPromise: Promise<void> | null = null;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TradingView: any;
  }
}
interface TVStockDetailWidgetProps {
  tickerSymbol: string;
  width?: number;
  height?: number;
}

const TVStockDetailWidget: React.FC<TVStockDetailWidgetProps> = ({
  tickerSymbol,
  width,
  height,
}) => {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setTheme(matcher.matches ? "dark" : "light");
    };

    matcher.addEventListener("change", onChange);
    onChange();

    return () => {
      matcher.removeEventListener("change", onChange);
      onLoadScriptRef.current = null;
    };
  }, []);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (onLoadScriptRef.current) onLoadScriptRef.current();
    });

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById("tradingview_stock") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          symbol: tickerSymbol,
          interval: "D",
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "kr",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_stock",
          width: width,
          height: height,
        });
      }
    }
  }, [tickerSymbol, theme, width, height]);

  return (
    <div
      className="tradingview-widget-container"
      style={{
        height: height,
        width: width,
        display: "flex",
        alignItems: "center",
      }}>
      <div
        id="tradingview_stock"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      />
    </div>
  );
};

export default TVStockDetailWidget;
