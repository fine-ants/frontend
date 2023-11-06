import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import Legend from "@components/common/PieChart/Legend";
import RechartPieChart from "@components/common/PieChart/RechartPieChart";
import { CSSProperties } from "react";
import { chartColorPalette } from "styles/chartColorPalette";

type Props = {
  width: number;
  height: number;
  legendStyle?: CSSProperties;
};

export default function PortfolioPieChart({
  width,
  height,
  legendStyle,
}: Props) {
  const { data: pieData } = usePortfolioListQuery();

  const coloredPieData = pieData?.portfolios.map((item, index) => ({
    name: item.name,
    value: item.budget,
    fill: chartColorPalette[index],
  }));

  return coloredPieData ? (
    <>
      <RechartPieChart width={width} height={height} pieData={coloredPieData} />
      <Legend style={legendStyle} pieData={coloredPieData} />
    </>
  ) : (
    <div>로딩중</div>
    // TODO: loading indicator
  );
}
