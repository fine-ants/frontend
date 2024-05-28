import { Icon } from "@components/Icon";
import splitAndIncludeDelimiter from "@components/SearchBar/utils/splitAndIncludeDelimiter";
import { StockSearchItem } from "@features/stock/api";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { HTMLAttributes } from "react";
import styled from "styled-components";

type RenderOptionDefaultProps = {
  props: HTMLAttributes<HTMLLIElement>;
  searchValue: string;
  option: StockSearchItem;
};

export default function RenderOptionDefault({
  props,
  searchValue,
  option,
}: RenderOptionDefaultProps) {
  const { isMobile } = useResponsiveLayout();

  return (
    <li {...props} style={renderOptionDefaultStyles(isMobile)}>
      <div>
        <CompanyName $isMobile={isMobile}>
          {splitAndIncludeDelimiter(option.companyName, searchValue).map(
            (word, idx) =>
              word === searchValue ? (
                <Highlight key={idx}>{word}</Highlight>
              ) : (
                word
              )
          )}
        </CompanyName>
        <TickerSymbol>{option.tickerSymbol}</TickerSymbol>
      </div>

      {/* TODO: Add watchlist logic */}
      <Icon icon="favorite" size={isMobile ? 24 : 16} color="gray400" />
    </li>
  );
}

const renderOptionDefaultStyles = (isMobile: boolean) => ({
  height: isMobile ? "56px" : "47px",
  justifyContent: "space-between",
});

const CompanyName = styled.p<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.body2.font : designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray400};
`;

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
