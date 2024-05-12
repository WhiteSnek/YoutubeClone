export function getExactTime(timestamp) {
  const dateString = "2024-05-11T18:03:08.789Z";
  const date = new Date(dateString);

  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const commaformattedDate = formattedDate.replace(/,/g, "");
  const parts = commaformattedDate.split(' ');
const finalFormat = `${parts[1]} ${parts[0]} ${parts[2]}`;

  return finalFormat;
}
