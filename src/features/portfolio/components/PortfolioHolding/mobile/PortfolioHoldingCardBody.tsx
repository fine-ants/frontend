import RateBadge from "@components/Badges/RateBadge";
import { IconButton } from "@components/Buttons/IconButton";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import SelectableCard from "@components/CardTable/SelectableCardTable/SelectableCard";
import { PortfolioHolding } from "@features/portfolio/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import { Collapse } from "@mui/material";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingLotsTableM from "./PortfolioHoldingLots/PortfolioHoldingLotsTableM";

type Props = {
  visibleRows: readonly PortfolioHolding[];
  selected: readonly PortfolioHolding[];
  updateSelected: (selected: readonly PortfolioHolding[]) => void;
};

export default function PortfolioHoldingCardBody({
  visibleRows,
  selected,
  updateSelected,
}: Props) {
  const handleClick = (_: ChangeEvent<unknown>, id: number) => {
    const selectedItem = selected.find((item) => item.id === id);
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly PortfolioHolding[] = [];

    if (selectedItemIndex === -1) {
      // 선택이 되어있지 않은 경우, 해당 아이템을 선택 및 추가
      const targetItem = visibleRows.find((item) => item.id === id);
      newSelected = newSelected.concat(selected, targetItem ?? []);
    } else if (selectedItemIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedItemIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedItemIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedItemIndex),
        selected.slice(selectedItemIndex + 1)
      );
    }
    updateSelected(newSelected);
  };

  return (
    <StyledPortfolioListCardList>
      {visibleRows.map((item, index) => (
        <PortfolioHoldingCard
          key={index}
          item={item}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </StyledPortfolioListCardList>
  );
}

function PortfolioHoldingCard({
  item,
  selected,
  handleClick,
}: {
  item: PortfolioHolding;
  selected: readonly PortfolioHolding[];
  handleClick: (event: ChangeEvent<unknown>, id: number) => void;
}) {
  const {
    id,
    companyName,
    tickerSymbol,
    numShares,
    currentValuation,
    currentPrice,
    averageCostPerShare,
    dailyChange,
    dailyChangeRate,
    totalGain,
    totalReturnRate,
    annualDividend,
    annualDividendYield,
    purchaseHistory,
  } = item;

  const { state: isCollapsed, setOpposite: collapseOpposite } = useBoolean();

  const isSelected = !!selected.find((item) => item.id === id);

  return (
    <SelectableCard
      isSelected={isSelected}
      onChange={(event) => handleClick(event, id)}
      CardHeader={
        <StyledLink to={`/stock/${tickerSymbol}`}>
          <h2>{companyName}</h2>
          <span>{tickerSymbol}</span>
        </StyledLink>
      }
      CardBody={
        <>
          <CardItemRow title="평가 금액">
            <Contents>₩{thousandsDelimiter(currentValuation)}</Contents>
          </CardItemRow>
          <CardItemRow title="현재가">
            <Contents>₩{thousandsDelimiter(currentPrice)}</Contents>
          </CardItemRow>
          <CardItemRow title="평균 매입가">
            <Contents>₩{thousandsDelimiter(averageCostPerShare)}</Contents>
          </CardItemRow>
          <CardItemRow title="개수">
            <Contents>{numShares}</Contents>
          </CardItemRow>
          <CardItemRow title="변동률">
            <ContentsWrapper>
              <Contents>{thousandsDelimiter(dailyChange)}</Contents>
              <RateBadge
                size={16}
                value={dailyChangeRate}
                bgColorStatus={false}
              />
            </ContentsWrapper>
          </CardItemRow>
          <CardItemRow title="총 손익">
            <ContentsWrapper>
              <Contents>₩{thousandsDelimiter(totalGain)}</Contents>
              <RateBadge
                size={16}
                value={totalReturnRate}
                bgColorStatus={false}
              />
            </ContentsWrapper>
          </CardItemRow>
          <CardItemRow title="연 배당금">
            <ContentsWrapper>
              <Contents>₩{thousandsDelimiter(annualDividend)}</Contents>
              <RateBadge
                size={16}
                value={annualDividendYield}
                bgColorStatus={false}
              />
            </ContentsWrapper>
          </CardItemRow>
          <CardItemRow title="">
            <IconButton
              icon={isCollapsed ? "chevron-up" : "chevron-down"}
              size="h32"
              iconColor="custom"
              customColor={{
                color: isCollapsed ? "blue500" : "gray400",
                hoverColor: "gray200",
              }}
              onClick={collapseOpposite}
            />
          </CardItemRow>
          <Collapse in={isCollapsed} timeout="auto">
            <PortfolioHoldingLotsTableM
              portfolioHoldingId={id}
              purchaseHistory={purchaseHistory}
            />
          </Collapse>
        </>
      }
    />
  );
}

const StyledPortfolioListCardList = styled.div`
  margin-bottom: 24px;
  border-top: 1px solid ${designSystem.color.neutral.gray100};
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  h2 {
    font: ${designSystem.font.title4.font};
    letter-spacing: ${designSystem.font.title4.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }

  span {
    font: ${designSystem.font.body4.font};
    color: ${designSystem.color.neutral.gray400};
  }
`;

const Contents = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
