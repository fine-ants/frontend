import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import designSystem from "@styles/designSystem";
import { SectorTooltip } from "./SectorTooltip";

type Props = {
  fill: string;
  weight: number;
  title: string;
  sectorBarWidth: number;
};
export default function SectorBarItem({
  title,
  fill,
  weight,
  sectorBarWidth,
}: Props) {
  return (
    <div>
      <SectorTooltip
        placement="top"
        title={
          <>
            <TitleWrapper>
              <Color $color={fill} />
              <SectorTitle>{title}</SectorTitle>
            </TitleWrapper>
            <Percent>{weight}%</Percent>
          </>
        }>
        <StyledSectorBarItem
          $fill={fill}
          $width={sectorBarWidth * (weight / 100)}
        />
      </SectorTooltip>
    </div>
  );
}

const StyledSectorBarItem = styled("div")<{ $fill: string; $width: number }>(
  ({ $fill, $width }) => ({
    width: `${$width}px`,
    height: "24px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "4px",
    backgroundColor: $fill,
  })
);

const Color = styled("div")<{ $color: string }>(({ $color }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: $color,
}));

const TitleWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "3.5px",
});

const SectorTitle = styled(Typography)({
  font: designSystem.font.title5.font,
  letterSpacing: designSystem.font.title5.letterSpacing,
  color: designSystem.color.neutral.gray600,
});

const Percent = styled(Typography)({
  font: designSystem.font.title5.font,
  letterSpacing: designSystem.font.title5.letterSpacing,
  color: designSystem.color.primary.blue500,
});
