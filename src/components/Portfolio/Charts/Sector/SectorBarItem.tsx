import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import designSystem from "@styles/designSystem";
import * as React from "react";

const SECTOR_BAR_WIDTH = 400;

type Props = {
  fill: string;
  weight: number;
  title: string;
};
export default function SectorBarItem({ title, fill, weight }: Props) {
  return (
    <div>
      <SectorTooltip
        placement="top"
        title={
          <React.Fragment>
            <TitleWrapper>
              <Color $color={fill} />
              <SectorTitle>{title}</SectorTitle>
            </TitleWrapper>
            <Percent>{weight}%</Percent>
          </React.Fragment>
        }>
        <StyledSectorBarItem
          $fill={fill}
          $width={SECTOR_BAR_WIDTH * (weight / 100)}
        />
      </SectorTooltip>
    </div>
  );
}

const SectorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    PopperProps={{
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -6], // 첫 번째 값은 수평 방향, 두 번째 값은 수직 방향
          },
        },
      ],
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    display: "flex",
    alignItems: "center",
    backgroundColor: designSystem.color.neutral.white,
    gap: "8px",
    color: designSystem.color.neutral.gray600,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${designSystem.color.neutral.gray100}`,
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",
  },
}));

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
  font: designSystem.font.title5,
  color: designSystem.color.neutral.gray600,
});

const Percent = styled(Typography)({
  font: designSystem.font.title5,
  color: designSystem.color.primary.blue500,
});
