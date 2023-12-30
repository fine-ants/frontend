import { useParams } from "react-router-dom";
import TVStockDetailWidget from "../components/TradingViewWidgets/TVStockDetailWidget";
import BasePage from "./BasePage";

export default function StockPage() {
  const { tickerSymbol } = useParams();

  return (
    <BasePage>
      {tickerSymbol && <TVStockDetailWidget tickerSymbol={tickerSymbol} />}
    </BasePage>
  );
}
