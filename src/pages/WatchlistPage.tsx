import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Watchlist } from "@components/Watchlist/Watchlist";

export type StockItem = {
  id: number;
  name: string;
  currentPrice: number;
  change: {
    isUp: boolean;
    value: number;
  };
  dividends: number;
  sector: string;
};

export default function WatchlistPage() {
  return (
    <StyledWatchlistPage>
      <Header />
      <Main>
        <DndProvider backend={HTML5Backend}>
          <Watchlist stockItems={stockItems} />
        </DndProvider>
      </Main>
      <Footer />
    </StyledWatchlistPage>
  );
}

const StyledWatchlistPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  height: 1024px;
  background-color: #ffffff;
  border: 1px solid #000000;
`;

const Main = styled.main`
  width: 100%;
  height: 828px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const stockItems = [
  {
    id: 1,
    name: "삼성전자",
    currentPrice: 68000,
    change: {
      isUp: true,
      value: 1.85,
    },
    dividends: 2.12,
    sector: "제조업",
  },
  {
    id: 2,
    name: "카카오",
    currentPrice: 43200,
    change: {
      isUp: false,
      value: 1.03,
    },
    dividends: 0.14,
    sector: "서비스업",
  },
  {
    id: 3,
    name: "NAVER",
    currentPrice: 191800,
    change: {
      isUp: false,
      value: 2.64,
    },
    dividends: 4.14,
    sector: "서비스업",
  },
  {
    id: 4,
    name: "현대차",
    currentPrice: 128000,
    change: {
      isUp: true,
      value: 0.95,
    },
    dividends: 3.5,
    sector: "제조업",
  },
  {
    id: 5,
    name: "LG전자",
    currentPrice: 81000,
    change: {
      isUp: true,
      value: 2.75,
    },
    dividends: 2.43,
    sector: "제조업",
  },
  {
    id: 6,
    name: "셀트리온",
    currentPrice: 230000,
    change: {
      isUp: false,
      value: 1.9,
    },
    dividends: 1.33,
    sector: "의약업",
  },
  {
    id: 7,
    name: "SK하이닉스",
    currentPrice: 95000,
    change: {
      isUp: false,
      value: 0.86,
    },
    dividends: 2.21,
    sector: "제조업",
  },
  {
    id: 8,
    name: "POSCO",
    currentPrice: 315000,
    change: {
      isUp: true,
      value: 1.1,
    },
    dividends: 4.2,
    sector: "제조업",
  },
  {
    id: 9,
    name: "한화솔루션",
    currentPrice: 43000,
    change: {
      isUp: true,
      value: 3.85,
    },
    dividends: 0.9,
    sector: "에너지업",
  },
  {
    id: 10,
    name: "기아",
    currentPrice: 74500,
    change: {
      isUp: true,
      value: 2.25,
    },
    dividends: 3.15,
    sector: "제조업",
  },
];
