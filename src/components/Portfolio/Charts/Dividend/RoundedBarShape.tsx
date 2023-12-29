import designSystem from "@styles/designSystem";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RoundedBarShape(props: any) {
  const { amount, fill, x, y, width, height, index, onClick, radius, isHover } =
    props;

  const adjustedY = y - 8;

  const path = useMemo(() => {
    return `
      M${x + radius},${adjustedY} 
      L${x + width - radius},${adjustedY} 
      Q${x + width},${adjustedY} ${x + width},${adjustedY + radius}
      L${x + width},${adjustedY + height - radius} 
      Q${x + width},${adjustedY + height} ${x + width - radius},${
        adjustedY + height
      }
      L${x + radius},${adjustedY + height} 
      Q${x},${adjustedY + height} ${x},${adjustedY + height - radius}
      L${x},${adjustedY + radius} 
      Q${x},${adjustedY} ${x + radius},${adjustedY}
      Z`;
  }, [x, adjustedY, width, height, radius]);

  return (
    <path
      cursor={"pointer"}
      d={path}
      fill={
        isHover
          ? amount === 0
            ? designSystem.color.neutral.white
            : designSystem.color.primary.blue200
          : fill
      }
      onClick={() => onClick(index)}
    />
  );
}
