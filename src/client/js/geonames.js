// Script for fetching data using the geonames API

// GeoApi to fetch city proposals
module.exports.fetchProposals = async term => {
    const {GEO_BASEURL, GEO_USERNAME} = process.env
    try {
      const result = await fetch(
        `${GEO_BASEURL}/searchJSON?name=${term}&featureClass=P&fetureCode=PPLS&${GEO_USERNAME}`,
      )
      const cities = await result.json()
      return cities
    } catch (e) {
      throw e
    }
  }
  
  // GeoApi to fetch city details
  module.exports.fetchData = async (city, country) => {
    const {GEO_BASEURL, GEO_USERNAME} = process.env
    try {
      if (!city && !country) {
        throw 'Please enter a City to look for!'
      }
      const result = await fetch(
        `${GEO_BASEURL}/searchJSON?name=${city}&country=${country}&featureClass=P&fetureCode=PPLS&${GEO_USERNAME}`,
      )
      const {geonames: cities} = await result.json()
      if (cities.length > 0) {
        const location = {
          location: `${cities[0].name}, ${cities[0].countryName}`,
          lat: cities[0].lat,
          lng: cities[0].lng,
        }
        return location
      }
      return {}
    } catch (e) {
      throw e
    }
  }