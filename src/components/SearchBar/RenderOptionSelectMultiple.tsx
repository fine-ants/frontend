import { StockSearchItem } from "@api/stock";
import CheckBox from "@components/common/Checkbox/Checkbox";
import designSystem from "@styles/designSystem";
import { splitAndIncludeDelimiter } from "@utils/delimiters";
import { HTMLAttributes } from "react";
import styled from "styled-components";

type RenderOptionSelectMultipleProps = {
  props: HTMLAttributes<HTMLLIElement>;
  searchValue: string;
  option: StockSearchItem;
  selectedOptions: StockSearchItem[];
  onClick: () => void;
};

export default function RenderOptionSelectMultiple({
  props,
  searchValue,
  option,
  selectedOptions,
  onClick,
}: RenderOptionSelectMultipleProps) {
  const isSelected = (tickerSymbol: string) =>
    !!selectedOptions.find((item) => item.tickerSymbol === tickerSymbol);

  return (
    <li {...props} style={renderOptionSelectStyles} onClick={onClick}>
      <CheckBox
        size="h16"
        checkType="check"
        checked={isSelected(option.tickerSymbol)}
        inputProps={{
          "aria-label": `checkbox-${option.tickerSymbol}`,
        }}
      />
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
    </li>
  );
}

const renderOptionSelectStyles = {
  height: "32px",
  justifyContent: "flex-start",
};

const CompanyName = styled.p`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  font: ${designSystem.font.body4};
  color: ${designSystem.color.neutral.gray400};
`;

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
