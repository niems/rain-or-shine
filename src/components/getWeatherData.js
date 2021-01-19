const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";
console.log(`getWeatherData(): ${API_KEY}`);

//* returns array of location matches based on query
export function autoCompleteSearch(query) {
  const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`;
  const autoLocations = fetch(url).then((response) => response.json());

  return autoLocations;
}

//* passed forecast api request data
//* returns array of day objects
export function parseForecastData(data) {
  const forecastList = [];

  for (let day of data.forecast.forecastday) {
    const iconPath = day.day.condition.icon;
    const iconIndex = iconPath.lastIndexOf("/");

    const dayData = {
      date: new Date(day.date).toDateString(),
      chanceOfRain: day.day.daily_chance_of_rain,
      temp: {
        celsius: {
          max: day.day.maxtemp_c,
          min: day.day.mintemp_c,
          avg: day.day.avgtemp_c,
        },
        fahrenheit: {
          max: day.day.maxtemp_f,
          min: day.day.mintemp_f,
          avg: day.day.avgtemp_f,
        },
      },
      condition: {
        text: day.day.condition.text,
        iconCode: day.day.condition.code,
        icon: iconPath.slice(iconIndex, iconPath.length),
      },
    };

    forecastList.push(dayData);
  }

  return forecastList;
}

//* returns array of days (objects) of forecast data based on query and days (max 10)
export function getForecastData(query, days = 10) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=${days}`;
  const forecastData = fetch(url).then((response) => response.json());

  return forecastData;
}
