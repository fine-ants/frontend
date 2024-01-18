import downIcon from "@assets/icons/ic_down.svg";
import noneIcon from "@assets/icons/ic_none.svg";
import upIcon from "@assets/icons/ic_up.svg";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Size = 12 | 16 | 24;

type Props = {
  rate: number;
  bgColorStatus?: boolean;
  iconStatus?: boolean;
  size: Size;
  isDividendRate?: boolean;
};

export default function RateBadge({
  rate,
  bgColorStatus = true,
  iconStatus = true,
  size,
  // TODO: 배당금 조건이 UI 데이터로 사용되지않는 방향으로
  // TODO: 숫자 + 나오는 로직 추가
  isDividendRate = false,
}: Props) {
  const rateStatus = rate > 0 ? "Gain" : rate < 0 ? "Loss" : "None";

  return (
    <div>
      <StyledRateBadge
        $colors={getColors(rate, isDividendRate)}
        $bgColorStatus={bgColorStatus}
        $size={size}>
        {iconStatus && (
          <img src={getIconSrc(rate)} alt={`${rate}% ${rateStatus}`} />
        )}
        <span>{rate}%</span>
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
    padding-top: 2px;
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

const getColors = (value: number, isDividendRateRate: boolean) => {
  // 배당금일시 바로 오렌지 색 리턴
  if (isDividendRateRate) {
    return {
      color: designSystem.color.state.orange,
      bgColor: designSystem.color.state.orange16,
    };
  }

  // 배당금이 아닌 경우 상승 하락에 따른 색깔 리턴
  if (value > 0) {
    return {
      color: designSystem.color.state.green,
      bgColor: designSystem.color.state.green16,
    };
  } else if (value === 0) {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  } else if (value < 0) {
    return {
      color: designSystem.color.state.red,
      bgColor: designSystem.color.state.red16,
    };
  } else {
    return {
      color: designSystem.color.neutral.gray400,
      bgColor: designSystem.color.neutral.gray40016,
    };
  }
};

const getIconSrc = (value: number) => {
  return value > 0 ? upIcon : value < 0 ? downIcon : noneIcon;
};
