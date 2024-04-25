import { Icon } from "@components/Icon";
import splitAndIncludeDelimiter from "@components/SearchBar/utils/splitAndIncludeDelimiter";
import { StockSearchItem } from "@features/stock/api";
import designSystem from "@styles/designSystem";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type RenderOptionDefaultProps = {
  props: HTMLAttributes<HTMLLIElement>;
  searchValue: string;
  option: StockSearchItem;
  path: string;
};

export default function RenderOptionDefault({
  props,
  searchValue,
  option,
  path,
}: RenderOptionDefaultProps) {
  return (
    <Link to={path}>
      <li {...props} style={renderOptionDefaultStyles}>
        <div>
          <CompanyName>
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
        <Icon icon="favorite" size={16} color="gray400" />
      </li>
    </Link>
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

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
