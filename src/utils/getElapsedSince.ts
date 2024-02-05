export const getElapsedSince = (dateObj: Date) => {
  const MS = 1000;
  const MINUTE = 60 * MS;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 31 * DAY;

  const now = Date.now();
  const diff = now - new Date(dateObj).getTime();

  if (diff < MINUTE) {
    return "방금";
  } else if (diff < HOUR) {
    return Math.floor(diff / MINUTE) + "분 전";
  } else if (diff < DAY) {
    return Math.floor(diff / HOUR) + "시간 전";
  } else if (diff < MONTH) {
    return Math.floor(diff / DAY) + "일 전";
  } else {
    return Math.floor(diff / MONTH) + "달 전";
  }
};
