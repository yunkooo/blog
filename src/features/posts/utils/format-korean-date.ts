const koreanDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatKoreanDate(date: string) {
  return koreanDateFormatter.format(new Date(date));
}
