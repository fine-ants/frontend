import PieChartSkeleton from "@components/common/PieChart/skeletons/PieChartSkeleton";

export default function HoldingsPieChartSkeleton() {
  return (
    <PieChartSkeleton
      containerWidth={256}
      containerHeight={256}
      pieWidth={256}
      pieHeight={256}
      innerCircleWidth={128}
      innerCircleHeight={128}
    />
  );
}
