// Convert YYYY-MM-DDTHH:MM:SS to YYYY-MM-DD
export function formatDate(dateStr: string): string {
  const dateStrRegex = new RegExp(
    /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])/
  );
  if (!dateStrRegex.test(dateStr)) {
    throw Error("날짜 형식은 YYYY-MM-DDTHH:MM:SS 입니다");
  }

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}
