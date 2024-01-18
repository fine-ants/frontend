import { StockSearchItem } from "@api/stock";
import { Icon } from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { HTMLAttributes } from "react";
import styled from "styled-components";

type RenderOptionDefaultProps = {
  props: HTMLAttributes<HTMLLIElement>;
  option: StockSearchItem;
  onClick: () => void;
};

export default function RenderOptionDefault({
  props,
  option,
  onClick,
}: RenderOptionDefaultProps) {
  return (
    <li {...props} style={renderOptionDefaultStyles} onClick={onClick}>
      <div>
        <CompanyName>{option.companyName}</CompanyName>
        <TickerSymbol>{option.tickerSymbol}</TickerSymbol>
      </div>

      {/* TODO: Add watchlist logic */}
      <Icon icon="favorite" size={16} color="gray400" />
    </li>
  );
}

const renderOptionDefaultStyles = {
  height: "47px",
  justifyContent: "space-between",
};

const CompanyName = styled.p`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray400};
`;
