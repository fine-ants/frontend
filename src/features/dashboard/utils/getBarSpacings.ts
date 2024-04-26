export function getBarSpacings(
  width: number,
  dataLength: number,
  range: string
) {
  let barSpacing;

  switch (range) {
    case "1D": // 일 단위
      barSpacing = width / 1;
      break;
    case "1W": // 주 단위
      barSpacing = width / 7;
      break;
    case "1M": // 월 단위
      barSpacing = width / 30;
      break;
    case "1Q": // 분기 단위
      barSpacing = width / 90;
      break;
    case "1Y": // 연 단위
      barSpacing = width / 365;
      break;
    default:
      return undefined;
  }

  // 보여지는 데이터의 개수
  const numberOfPoints = width / barSpacing;

  // 데이터의 개수가 보여지는 데이터의 개수보다 적으면 barSpacing을 1로 설정
  if (numberOfPoints > dataLength) {
    barSpacing = width / dataLength;
  }

  return Math.max(1, barSpacing);
}
