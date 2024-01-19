import { chartColorPalette } from "@styles/chartColorPalette";
import designSystem from "@styles/designSystem";
import { CSSProperties } from "react";
import styled from "styled-components";
import PieChartLegendItem, {
  Props as PieChartLegendItemProps,
} from "./TallLegendItem";

type Props = {
  legendList: PieChartLegendItemProps[];
  etcOptions?: {
    title: string;
    numItemsFromFront: number;
  };
  style?: CSSProperties;
};

export default function TallLegend({ legendList, etcOptions, style }: Props) {
  const displayedLegendList = [...legendList];

  const etcList =
    etcOptions && etcOptions.numItemsFromFront < legendList.length
      ? displayedLegendList.splice(etcOptions.numItemsFromFront)
      : undefined;

  const etcPercent = etcList?.reduce((acc, item) => acc + item.percent, 0);

  return (
    <StyledLegend style={style}>
      <Content>
        <ItemsList>
          {displayedLegendList.map((item, idx) => (
            <PieChartLegendItem
              key={idx}
              color={item.color}
              title={item.title}
              percent={Math.floor(item.percent)}
            />
          ))}
        </ItemsList>

        {etcOptions && etcList && etcPercent && (
          <EtcListContainer>
            <PieChartLegendItem
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
      </Content>
    </StyledLegend>
  );
}

const StyledLegend = styled.div`
  width: 300px;
  height: 363px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
`;

const Content = styled.div`
  height: 315px;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${designSystem.color.neutral.gray200};
    border-radius: 2px; /* 스크롤바의 모서리를 둥글게 */
  }
`;

const ItemsList = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${designSystem.color.neutral.white};
  border-bottom: 1px solid ${designSystem.color.neutral.gray200};
`;

const EtcListContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const EtcList = styled.div`
  margin-left: 4px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 2px solid ${designSystem.color.neutral.gray200};
`;

const EtcItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
