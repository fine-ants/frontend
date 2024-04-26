import { CircularProgress, SxProps } from "@mui/material";
import designSystem from "@styles/designSystem";

type Props = {
  size?: number | string;
  color?: string;
  sx?: SxProps;
};

export default function Spinner({
  size = 30,
  color = designSystem.color.primary.blue500,
  sx,
}: Props) {
  return (
    <CircularProgress
      size={size}
      sx={{
        color,
        ...sx,
      }}
    />
  );
}
