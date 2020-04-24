// Getting the API credentials from the .env file ** Not Working
// import dotenv from 'dotenv';
// dotenv.config();
// get the Coordinates by place

export const getCoordinatesAPI = async (city, country = '') => {
    //const {GEO_BASEURL,GEO_USERNAME} = process.env
    const GEO_BASEURL = 'http://api.geonames.org';
    const GEO_USERNAME = 'gcedeno'
    //console.log("Data used to fetch Geo data:\n",{city,country});
    const callUrl = `${GEO_BASEURL}/searchJSON?q=${city}&maxRows=3&username=${GEO_USERNAME}`;
    //const callUrl = `${GEO_BASEURL}/searchJSON?q=${city}&country=${country}&maxRows=3&username=${GEO_USERNAME}`;
    
    //console.log("Geonames call URL",callUrl);
    const res = await fetch(callUrl);
    try {
        const data = await res.json();
        
        if(data.totalResultsCount == 0) {
            return { error: "The "+ city +" can't be found" };
        }
        //console.log("GeoData from API:\n",data);
        return data;

    } catch(err){
        console.log(err);
    }
    
}
//Getting the weather forecast
export const getWeatherAPI = async (lat, lng, date = '') => {
    //const {Weatherbit_BASEURL, Weatherbit_APIKEY} = process.env
    const Weatherbit_APIKEY = '697c051d3c574c73ac4d4c861189ee04'
    const Weatherbit_BASEURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'

    //const dateInSeconds = new Date(date) / 1000; //May need reformating 
    const startDate = date;
    //Note: reads date in "YYYY-MM-DD" format
    //const callUrl = `${OpenWeather_BASEURL}/${OpenWeather_APIKEY}/${lat},${lng},${dateInSeconds}`;
    //console.log("Data used to fetch Weather data:\n",{lat,lng,date});
    const callUrl = `${Weatherbit_BASEURL}?&lat=${lat}&lon=${lng}&key=${Weatherbit_APIKEY}&start_date=${startDate}`;
    //console.log("Data used to fetch Weather data:/n",{lat,lng,date});
    //Need to create a new comple URL for fetching data;
    const completeURL = 'https://cors-anywhere.herokuapp.com/'+ callUrl;
    //console.log("Weather call URL",callUrl);
    try {
        const request = await fetch(completeURL);
        const result = await request.json();
        //console.log("Row data from weatherbit:\n",result)
        return result;

    } catch(err){
        console.log(err);
    }
    
}

export const getImageAPI = async (keyword) => {

    //replace the spaces with + sign;
    keyword = keyword.replace(/\s/g, '+');
    //Getting API URL and Key from env variables
    //const {PIXABAY_BASEURL, PIXABAY_KEY} = process.env
    const PIXABAY_KEY = '16022464-a4c95411c02f3b618af99b98b'
    const PIXABAY_BASEURL = 'https://pixabay.com/api/'
    const callUrl = `${PIXABAY_BASEURL}?key=${PIXABAY_KEY}&q=${keyword}&image_type=photo&pretty=true`;
    //console.log("Pixabay call URL",callUrl);
    const res = await fetch(callUrl);

    try {

        const data = await res.json();
        //console.log("Data from PIXABAY:\n",data)
        return data;

    } catch(err){
        console.log(err);
    }
    
}