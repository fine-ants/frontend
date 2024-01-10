import { chartColorPalette } from "@styles/chartColorPalette";
import { CSSProperties, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Props as PieChartLegendItemProps } from "./TallLegendItem";
import WideLegendItem from "./WideLegendItem";

type Props = {
  legendList: PieChartLegendItemProps[];
  etcOptions?: {
    title: string;
    numItemsFromFront: number;
  };
  style?: CSSProperties;
};

export default function WideLegend({ legendList, etcOptions, style }: Props) {
  const legendBoxRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  const displayedLegendList = [...legendList];

  const etcList =
    etcOptions && etcOptions.numItemsFromFront < legendList.length
      ? displayedLegendList.splice(etcOptions.numItemsFromFront)
      : undefined;

  const etcPercent = etcList?.reduce((acc, item) => acc + item.percent, 0);

  useEffect(() => {
    const { clientHeight, scrollHeight } = legendBoxRef.current ?? {
      clientHeight: 0,
      scrollHeight: 0,
    };

    setHasScroll(clientHeight < scrollHeight);
  }, []);

  return (
    <StyledLegend $hasScroll={hasScroll} ref={legendBoxRef} style={style}>
      {displayedLegendList.map((item, idx) => (
        <WideLegendItem
          key={idx}
          color={item.color}
          title={item.title}
          percent={Math.floor(item.percent)}
        />
      ))}

      {etcOptions && etcList && etcPercent && (
        <EtcListContainer>
          <WideLegendItem
            color={chartColorPalette[chartColorPalette.length - 1]}
            title={etcOptions.title}
            percent={etcPercent}
          />
          <EtcList>
            {etcList.map((item, idx) => (
              <EtcItem key={idx}>
                <span>{item.title}</span>
                <span>{Math.floor(item.percent)}%</span>
              </EtcItem>
            ))}
          </EtcList>
        </EtcListContainer>
      )}
    </StyledLegend>
  );
}

const StyledLegend = styled.div<{ $hasScroll: boolean }>`
  width: 400px;
  box-sizing: border-box;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  padding: ${({ $hasScroll }) => ($hasScroll ? "16px 4px 16px 16px" : "16px")};
  gap: 8px 24px;
  border: ${({ theme: { color } }) => `1px solid ${color.neutral.gray100}`};
  border-radius: 8px;
  overflow-y: ${({ $hasScroll }) => ($hasScroll ? "scroll" : "none")};
`;

const EtcListContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
`;

const EtcList = styled.div`
  margin-left: 4px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 2px solid ${({ theme: { color } }) => color.neutral.gray200};
`;

const EtcItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${({ theme: { font } }) => font.title5.font};
  letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray600};
`;
