export const convertDate = (inputDateString) => {
  const inputDate = new Date(inputDateString);

  const day = inputDate.getDate();
  const monthIndex = inputDate.getMonth();
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const outputDateString = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  return outputDateString;
};
