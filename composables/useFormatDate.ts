export function useFormatDate(date: string) {
  const formattedDate = new Date(date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return formattedDate.toLocaleString("pl-PL", dateOptions).replace(",", "");
}
