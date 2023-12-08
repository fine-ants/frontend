import PieChartSkeleton from "@components/common/PieChart/skeletons/PieChartSkeleton";

export default function HoldingsPieChartSkeleton() {
  return (
    <PieChartSkeleton
      containerWidth={600}
      containerHeight={318}
      pieWidth={200}
      pieHeight={200}
      innerCircleWidth={130}
      innerCircleHeight={130}
    />
  );
}
