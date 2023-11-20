import { useParams } from "react-router-dom";
import TVStockDetailWidget from "../components/TradingViewWidgets/TVStockDetailWidget";
import BasePage from "./BasePage";

export default function StockPage() {
  const { id } = useParams();

  return <BasePage>{id && <TVStockDetailWidget tickerSymbol={id} />}</BasePage>;
}
