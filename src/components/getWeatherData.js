import {
  getDateTimeString,
  getFixedTemp,
  getLocaleString,
  getLocaleTimeString,
} from "./helpers/conversions";

const SEARCH_API_KEY = process.env.REACT_APP_WEATHER_LOCATION_API_KEY;
const FORECAST_API_KEY = process.env.REACT_APP_WEATHER_FORECAST_API_KEY;

const BASE_SEARCH_URL = "http://api.weatherapi.com/v1";
const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5";
console.log(`getWeatherData() search api key: ${SEARCH_API_KEY}`);
console.log(`forecast api key: ${FORECAST_API_KEY}`);

//* returns array of location matches based on query
export function autoCompleteSearch(query) {
  const url = `${BASE_SEARCH_URL}/search.json?key=${SEARCH_API_KEY}&q=${query}`;
  const autoLocations = fetch(url).then((response) => response.json());

  return autoLocations;
}

//* passed forecast api request data
//* returns array of day objects
export function parseForecastData(data) {
  //* data used as part of the parent state
  const parsedData = {
    current: data.current,
    forecast: data.daily,
  };

  parsedData.current.dt = getDateTimeString(parsedData.current.dt);
  parsedData.current.temp = getFixedTemp(parsedData.current.temp);
  parsedData.current.feels_like = getFixedTemp(parsedData.current.feels_like);

  for (let i = 0; i < parsedData.forecast.length; i++) {
    const daily = parsedData.forecast[i];

    //!daily.dt = getLocaleString(daily.dt);
    //* new parsings for 'tomorrow' - may effect 'weekly'
    daily.weeklyDT = getLocaleString(daily.dt);
    daily.dt = getDateTimeString(daily.dt);
    daily.temp.day = getFixedTemp(daily.temp.day);
    daily.feels_like.day = getFixedTemp(daily.feels_like.day);

    daily.sunrise = getLocaleTimeString(daily.sunrise);
    daily.sunset = getLocaleTimeString(daily.sunset);

    daily.temp.day = getFixedTemp(daily.temp.day);
    daily.temp.night = getFixedTemp(daily.temp.night);
    console.log(`\n\n\t - rain: ${daily.rain}`);
    console.log(`\t - probability of precipitation: ${daily["pop"]}`);

    parsedData.forecast[i] = daily;
  }

  return parsedData;
}

//* returns array of days (objects) of forecast data based on query and days (max 10)
export function getForecastData(query, unitType = "imperial") {
  const EXCLUDES = "minutely,hourly,alerts";
  let url = "";

  //* api doesn't need unit type for kevlin (default)
  if (unitType === "kelvin") {
    url = new URL(
      `${BASE_FORECAST_URL}/onecall?lat=${query.lat}&lon=${query.lon}&exclude=${EXCLUDES}&appid=${FORECAST_API_KEY}`
    );
  } else {
    url = new URL(
      `${BASE_FORECAST_URL}/onecall?lat=${query.lat}&lon=${query.lon}&exclude=${EXCLUDES}&units=${unitType}&appid=${FORECAST_API_KEY}`
    );
  }

  console.log(`getForecastData() query: ${JSON.stringify(query)}`);
  const forecastData = fetch(url).then((response) => response.json());

  return forecastData;
}
