function formatDate(date) { // 2019-05-26T04:25:34.606Z
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  date = date.slice(0, 10).split("-");
  return date[2] + " " + months[+date[1] - 1] + ", " + date[0];
}

export { formatDate }