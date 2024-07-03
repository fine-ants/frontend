import RateBadge from "@components/Badges/RateBadge";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import SelectableCard from "@components/CardTable/SelectableCardTable/SelectableCard";
import { securitiesFirmLogos } from "@constants/securitiesFirm";
import { PortfolioItem } from "@features/portfolio/api/types";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  visibleRows: readonly PortfolioItem[];
  selected: readonly PortfolioItem[];
  updateSelected: (newSelected: readonly PortfolioItem[]) => void;
};

export default function PortfolioListCardBody({
  visibleRows,
  selected,
  updateSelected,
}: Props) {
  const handleClick = (_: ChangeEvent<unknown>, id: number) => {
    const selectedItem = selected.find((item) => item.id === id);
    const selectedItemIndex = selectedItem
      ? selected.indexOf(selectedItem)
      : -1;

    let newSelected: readonly PortfolioItem[] = [];

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
        <PortfolioListCard
          key={index}
          item={item}
          selected={selected}
          handleClick={handleClick}
        />
      ))}
    </StyledPortfolioListCardList>
  );
}

function PortfolioListCard({
  item,
  selected,
  handleClick,
}: {
  item: PortfolioItem;
  selected: readonly PortfolioItem[];
  handleClick: (event: ChangeEvent<unknown>, id: number) => void;
}) {
  const {
    id,
    name,
    securitiesFirm,
    currentValuation,
    budget,
    totalGain,
    totalGainRate,
    dailyGain,
    dailyGainRate,
    expectedMonthlyDividend,
    numShares,
  } = item;

  const isSelected = !!selected.find((item) => item.id === id);

  return (
    <SelectableCard
      isSelected={isSelected}
      onChange={(event) => handleClick(event, id)}
      CardHeader={
        <StyledLink to={`/portfolio/${id}`}>
          <FirmImage
            src={securitiesFirmLogos[securitiesFirm]}
            alt={`${securitiesFirm} 로고`}
          />
          {name}
        </StyledLink>
      }
      CardBody={
        <>
          <CardItemRow title="평가 금액">
            <Price>₩{thousandsDelimiter(currentValuation)}</Price>
          </CardItemRow>
          <CardItemRow title="투자 예산">
            <Price>₩{thousandsDelimiter(budget)}</Price>
          </CardItemRow>
          <CardItemRow title="총 손익">
            <GainWrapper>
              <Price>₩{thousandsDelimiter(totalGain)}</Price>
              <RateBadge
                size={16}
                value={totalGainRate}
                bgColorStatus={false}
              />
            </GainWrapper>
          </CardItemRow>
          <CardItemRow title="당일 손익">
            <GainWrapper>
              <Price>₩{thousandsDelimiter(dailyGain)}</Price>
              <RateBadge
                size={16}
                value={dailyGainRate}
                bgColorStatus={false}
              />
            </GainWrapper>
          </CardItemRow>
          <CardItemRow title="당월 예상 배당금">
            <Price>₩{thousandsDelimiter(expectedMonthlyDividend)}</Price>
          </CardItemRow>
          <CardItemRow title="종목 개수">
            <Price>{thousandsDelimiter(numShares)}</Price>
          </CardItemRow>
        </>
      }
    />
  );
}

const StyledPortfolioListCardList = styled.div`
  border-top: 1px solid ${designSystem.color.neutral.gray100};
  margin-bottom: 24px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const FirmImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Price = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const GainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
