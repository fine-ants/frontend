import { Icon } from "@components/Icon";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Size = 12 | 16 | 24;

type Props = {
  value: number;
  bgColorStatus?: boolean;
  iconStatus?: boolean;
  size: Size;
  noPercent?: boolean;
};

export default function RateBadge({
  value,
  bgColorStatus = true,
  iconStatus = true,
  size,
  noPercent = false,
}: Props) {
  return (
    <div>
      <StyledRateBadge
        $colors={getColors(value)}
        $bgColorStatus={bgColorStatus}
        $size={size}>
        {iconStatus && (
          <Icon size={12} icon={getIcon(value)} color={getIconColor(value)} />
        )}
        <span>
          {thousandsDelimiter(value)}
          {noPercent ? "" : "%"}
        </span>
      </StyledRateBadge>
    </div>
  );
}

const StyledRateBadge = styled.div<{
  $colors: { color: string; bgColor: string };
  $bgColorStatus: boolean;
  $size: Size;
}>`
  height: ${({ $size }) => $size}px;
  padding: 3.5px 4px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5px;
  background-color: ${({ $colors, $bgColorStatus }) =>
    $bgColorStatus ? $colors.bgColor : "none"};
  border-radius: 4px;
  padding: ${({ $bgColorStatus }) => ($bgColorStatus ? "3.5px 4px" : "0")};
  color: ${({ $colors }) => $colors.color};
  background-color: ${({ $colors, $bgColorStatus }) =>
    $bgColorStatus ? $colors.bgColor : "none"};
  border-radius: 4px;

  > span {
    font: ${({ $size }) =>
      $size === 12
        ? designSystem.font.title6.font
        : designSystem.font.title5.font};
    letter-spacing: ${({ $size }) =>
      $size === 12
        ? designSystem.font.title6.letterSpacing
        : designSystem.font.title5.letterSpacing};
  }
`;

const getColors = (value: number) => {
  // 배당금이 아닌 경우 상승 하락에 따른 색깔 리턴
  if (value > 0) {
    return {
      color: designSystem.color.state.green500,
      bgColor: designSystem.color.state.green16,
    };
  } else if (value === 0) {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  } else if (value < 0) {
    return {
      color: designSystem.color.state.red500,
      bgColor: designSystem.color.state.red16,
    };
  } else {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  }
};

const getIcon = (value: number) => {
  return value > 0 ? "up" : value < 0 ? "down" : "none";
};

const getIconColor = (value: number) => {
  return value > 0 ? "green500" : value < 0 ? "red500" : "gray400";
};
