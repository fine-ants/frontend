export default function formatTickValue(value: number) {
  if (value >= 1000000) {
    // 백만 단위 이상일 때 M을 붙여서 표시
    return `${(value / 1000000).toFixed(0)}M`;
  } else if (value >= 1000) {
    // 천 단위 이상 백만 단위 미만일 때 K를 붙여서 표시
    return `${(value / 1000).toFixed(0)}K`;
  } else {
    // 천 단위 미만일 때 그대로 표시
    return value.toString();
  }
}
