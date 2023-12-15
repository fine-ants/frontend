import { useLCLineChart } from "@components/hooks/useLCLineChart";
import { LineData } from "lightweight-charts";
import { useRef } from "react";

type Props = {
  data: LineData[];
  currentRangeIndex: number;
};

const rangeMapping = ["1D", "1W", "1M", "1Q", "1Y"];

export default function TotalValuationLineChart({
  data,
  currentRangeIndex,
}: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const currentRange = rangeMapping[currentRangeIndex];

  useLCLineChart({ chartContainerRef, data, currentRange });

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
