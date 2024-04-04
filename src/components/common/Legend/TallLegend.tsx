import { Divider } from "@mui/material";
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
      <Wrapper>
        <ItemsList>
          {displayedLegendList.map((item, idx) => (
            <PieChartLegendItem
              key={idx}
              color={item.color}
              title={item.title}
              percent={item.percent}
            />
          ))}
        </ItemsList>

        {etcOptions && etcList && etcPercent && (
          <>
            <StyledDivider />

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
                    <span>{item.percent}%</span>
                  </EtcItem>
                ))}
              </EtcList>
            </EtcListContainer>
          </>
        )}
      </Wrapper>
    </StyledLegend>
  );
}

const StyledLegend = styled.div`
  width: 300px;
  height: 363px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ItemsList = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${designSystem.color.neutral.white};
`;

const StyledDivider = styled(Divider)`
  border-color: ${designSystem.color.neutral.gray200};
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
