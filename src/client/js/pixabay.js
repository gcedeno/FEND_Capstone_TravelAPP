// Script for fetching data using the pixabay API

// PixaBayApi to fetch a city image
module.exports.fetchImage = async city => {
    const {PIXABAY_BASEURL, PIXABAY_KEY} = process.env
    try {
      const result = await fetch(
        `${PIXABAY_BASEURL}?q=${encodeURI(
          city,
        )}&image_type=photo&category=travel&key=${PIXABAY_KEY}`,
      )
      const {hits} = await result.json()
      return (hits.length > 0 && hits[0].webformatURL) || ''
    } catch (e) {
      throw e
    }
  }
  