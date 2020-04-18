// Gettng the API credentials from the .env file
require('dotenv').config()
//required fetching functionality 
import fetch from 'node-fetch';

// Create a new date instance dynamically with JS
let d = new Date()
// day/month/year format(Note:Open Weather API starts counting months from 0)
let newDate = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear()

// OpenWeather Api to fetch weather forecast (5 days with data every 3 hours)
export async function fetchWeather(lat, lng) {
    const {OpenWeather_BASEURL, OpenWeather_APIKEY} = process.env
  try {
    const request = await fetch(
      `${OpenWeather_BASEURL}?lat=${lat}&lon=${lng},us&units=metric&APPID=${OpenWeather_APIKEY}`,
    )
    const result = await request.json();
    //Showing the fetched data from openweather-api
    console.log("original fetched data from OpenWeather:\n ", result);
    // destructuring of the result object into interesting parameters
    // idea taken from: https://stackoverflow.com/questions/42475681/using-openweather-json-api-how-to-fetch-the-temperature
    /* const {
      main: {temp,pressure,humidity},
      name
    } = result
    */
    //result["main"]["temp"] //Getting the temp value
    //const {summary, temperatureMax, temperatureMin, icon} = completeForecast
    // weather = {summary, high: temperatureMax, low: temperatureMin, icon}

    const iter = 0;
    const temp = result["list"][iter]["main"]["temp"];
    const CityName = result["city"]["name"]
    const DateTime = result["list"][0]["dt_txt"]
    const feeling = result["list"][iter]["main"]["feels_like"];
    const low = result["list"][iter]["main"]["temp_min"];
    const high = result["list"][iter]["main"]["temp_max"];
    const summary = {"temp":temp,"feels_like":feeling};
    const weather = {"summary":summary,"high":high,"low":low, "Date":DateTime};
    // console.log(`Weather values for ${CityName}:\n`, {"Temperature":temperature,"Date":DateTime});
    console.log(`Weather values for ${CityName}:\n`, weather);

    return weather
    }

    catch (e) {
    console.log("error",e);
    throw e;
  }
}
