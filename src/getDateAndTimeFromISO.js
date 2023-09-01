export default function getDateAndTimeFromISO(isoString) {
  const dateTime = new Date(isoString);
  const date = isoString.substring(0, 10).split("-");
  return `${date[0]}-${date[1]}-${date[2]} ${
    dateTime.getUTCHours() + 8
  }:${dateTime.getUTCMinutes()}`;
}

export function convertToAmPmFormat(isoString) {
  const time = isoString.slice(
    isoString.indexOf("T") + 1,
    isoString.indexOf("Z") || isoString.length
  );

  const [hours, minutes] = time.split(":");
  let ampm = "AM";
  let formattedHours = parseInt(hours);

  if (formattedHours >= 12) {
    ampm = "PM";
    formattedHours = formattedHours % 12;
  }

  formattedHours = formattedHours === 0 ? 12 : formattedHours;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return formattedTime;
}
