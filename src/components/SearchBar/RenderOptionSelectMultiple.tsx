import CheckBox from "@components/Checkbox";
import splitAndIncludeDelimiter from "@components/SearchBar/utils/splitAndIncludeDelimiter";
import { StockSearchItem } from "@features/stock/api";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
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
  const { isMobile } = useResponsiveLayout();

  const isSelected = (tickerSymbol: string) =>
    !!selectedOptions.find((item) => item.tickerSymbol === tickerSymbol);

  return (
    <SelectRow
      {...props}
      style={renderOptionSelectStyles(isMobile)}
      onClick={onClick}>
      <CheckBox
        size="h16"
        checkType="check"
        checked={isSelected(option.tickerSymbol)}
        inputProps={{
          "aria-label": `checkbox-${option.tickerSymbol}`,
        }}
      />
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
    </SelectRow>
  );
}

const renderOptionSelectStyles = (isMobile: boolean) => {
  return {
    minHeight: isMobile ? "56px" : "32px",
    justifyContent: "flex-start",
  };
};

const SelectRow = styled.li`
  display: flex;
  gap: 8px;
`;

const CompanyName = styled.p<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title4.font : designSystem.font.body3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.title4.letterSpacing : "normal"};
  color: ${designSystem.color.neutral.gray900};
`;

const TickerSymbol = styled.p`
  font: ${designSystem.font.body4.font};
  color: ${designSystem.color.neutral.gray400};
`;

const Highlight = styled.span`
  color: ${designSystem.color.primary.blue500};
`;
