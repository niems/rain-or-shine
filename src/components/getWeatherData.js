const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";
console.log(`getWeatherData(): ${API_KEY}`);

//* returns array of location matches based on query
export function autoCompleteSearch(query) {
  const url = `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`;
  const autoLocations = fetch(url).then((response) => response.json());

  return autoLocations;
}

//* returns array of days (objects) of forecast data based on query and days (max 10)
export async function getForecastData(query, days = 10) {
  const url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=${days}`;
  console.log(`getForecastData() url: ${url}`);
  const forecastData = await fetch(url).then((response) => response.json());

  if (!forecastData) return;

  const forecastList = [];

  for (let day of forecastData.forecast.forecastday) {
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

// export async function testWeatherData(query) {
// //TODO: search data displayed as list underneath focused inputfield
// //TODO: after searching new location
// //* data pulled based on inputfield location query
// const data = await autoCompleteSearch(query);
// //console.log(`search data: ${JSON.stringify(data)}`);

// //TODO: move all forecast weather code to getForecastData function
// const selectedDataFromList = data[0];
// const dataCoordinates = `${selectedDataFromList.lat},${selectedDataFromList.lon}`;

// console.log(
// `selected data from list: ${JSON.stringify(selectedDataFromList)}`
// );

// const forecastList = await getForecastData(dataCoordinates, 4);
// console.log(`forecast length: ${forecastList.length}`);

// for (let i = 0; i < forecastList.length; i++) {
// console.log(`day: ${JSON.stringify(forecastList[i])}`);
// }
// }
