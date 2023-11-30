import downIcon from "@assets/icons/ic_down.svg";
import noneIcon from "@assets/icons/ic_none.svg";
import upIcon from "@assets/icons/ic_up.svg";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  rate: number;
  bgColorStatus?: boolean;
  iconStatus?: boolean;
  isDividend?: boolean;
};

export default function RateBadge({
  rate,
  bgColorStatus = true,
  iconStatus = true,
  // TODO: 배당금 조건이 UI 데이터로 사용되지않는 방향으로
  isDividend = false,
}: Props) {
  const getColor = (value: number, isDividendRate: boolean) => {
    // 배당금일시 바로 오렌지 색 리턴
    if (isDividendRate) {
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
    if (value > 0) {
      return upIcon;
    } else if (value < 0) {
      return downIcon;
    } else {
      return noneIcon;
    }
  };

  return (
    <StyledRateBadge
      $color={getColor(rate, isDividend)}
      $bgColorStatus={bgColorStatus}>
      {iconStatus && <img src={getIconSrc(rate)} alt="rateStatus" />}
      <span>{rate}%</span>
    </StyledRateBadge>
  );
}

const StyledRateBadge = styled.div<{
  $color: { color: string; bgColor: string };
  $bgColorStatus: boolean;
}>`
  display: flex;
  gap: 2.5px;
  align-items: center;
  justify-content: center;
  height: 24px;
  font: ${({ theme: { font } }) => font.title5};
  color: ${({ $color }) => $color.color};
  background-color: ${({ $color, $bgColorStatus }) =>
    $bgColorStatus ? $color.bgColor : "none"};
  border-radius: 4px;
  padding: 3.5px 4px;
`;
