import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TVStockDetailWidget from "../components/TradingViewWidgets/TVStockDetailWidget";
import BasePage from "./BasePage";

export default function StockPage() {
  const { id } = useParams();

  return (
    <BasePage>
      <Header />
      <Main>{id && <TVStockDetailWidget tickerSymbol={id} />}</Main>
      <Footer />
    </BasePage>
  );
}

const Main = styled.main`
  width: 100%;
  height: 828px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 150px;
`;
