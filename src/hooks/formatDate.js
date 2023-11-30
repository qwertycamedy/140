export const formatDate = (
  timestamp,
  isDay = true,
  isMonth = true,
  isYear = true,
  isHours = true,
  isMinutes = true
) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${isHours && isMinutes ? hours + ":" + minutes + ' / ' : ''}${isDay && day}.${
    isMonth && month
  }.${isYear && year}`;
};
