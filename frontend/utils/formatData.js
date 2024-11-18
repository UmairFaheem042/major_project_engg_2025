// Function to convert date and time from "2024-11-18T06:51:17.585Z" to "DD-MM-YYYY and time"
export const convertDateTime = (dateTime) => {
  const date = new Date(dateTime);

  // Get the day, month, year, hours, minutes, and seconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDate = `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
