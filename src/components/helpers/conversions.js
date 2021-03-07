export function getUnitType(typeName) {
  const typeConversion = {
    imperial: "F",
    metric: "C",
    kelvin: "K",
  };

  return typeConversion[typeName];
}

//* returns temperature without decimals
export function getFixedTemp(temp) {
  temp = Number(temp);
  return `${temp.toFixed(0)}`;
}

//* returns the millisecond conversion of the api timestamp
export function convertUnixTimestamp(timestamp) {
  const convertedTimestamp = new Date(timestamp * 1000);
  return convertedTimestamp;
}

export function getLocaleTimeString(data) {
  const options = { hour: "2-digit", minute: "2-digit" };
  const timestamp = convertUnixTimestamp(data);
  return timestamp.toLocaleTimeString([], options);
}

//* returns weekday, month & numeric day
export function getLocaleString(temp) {
  const timestampOpts = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  let localStr = convertUnixTimestamp(temp);
  localStr = localStr.toLocaleString("en-US", timestampOpts);

  return localStr;
}

//* returns month day, current time
export function getDateTimeString(temp) {
  let convertedTimestamp = convertUnixTimestamp(temp);

  //* gets current month and day
  let dateStamp = convertedTimestamp.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  let timestamp = convertedTimestamp.toLocaleTimeString();
  let lastIndex = timestamp.lastIndexOf(":");

  //* month day, time (minus the seconds)
  let finalTimestamp = `${dateStamp}, ${timestamp.slice(
    0,
    lastIndex
  )} ${timestamp.slice(-2)}`;

  return finalTimestamp;
}
