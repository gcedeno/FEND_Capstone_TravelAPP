// Setup empty JS object to act as endpoint for all routes
let destinationData = []

// Dependencies for Server Configuration
// Require Express to run server and routes
const express = require('express')
/* Dependencies */
const {json, urlencoded} = require('body-parser')
const cors = require('cors')
const uuid = require('uuid/v4')
const fetch = require('node-fetch')

// Get port from environment otherwise fallback to port 3000
export const PORT = process.env.PORT || 3000

// initialize express server with json and cors middleware
const app = express()

app.use(urlencoded({extended: false}))
app.use(json())
app.use(cors())

// Serve static files from dist folder
app.use(express.static('dist'))

// Connecting to the scripts running the APIs
const {fetchWeather} = require('./openweather')

// Get all destinations
app.get('/destinations', (req, res) => {
  res.status(200).send(tripData)
})

    /// **********************************************************/////
    // Get the weather forecast for the city (At the moment only actual weather)
    app.post('/destination', async (req, res) => {
      try { 
        const weather = await fetchWeather(lat, lng) //New change in function 
        // Calc time difference in days with no comma
        const difference = (
          (new Date(date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
        ).toFixed(0)
        const trip = {
          id: uuid(),
          img,
          location,
          date,
          difference,
          weather,
        }
        tripData.push(trip)
        res.status(201).send()
  } catch (e) {
    console.log(e)
    res.res.sendStatus(404)
  }
  })

// Delete a destination by id
app.delete('/destination', (req, res) => {
  const {id} = req.query
  const destinationIndex = destinationData.findIndex(destination => destinantion.id === id)
  switch (destinationIndex) {
    case -1:
      res.sendStatus(404)
      break
    default:
      destinationData.splice(destinationIndex, 1)
      res.status(204).send({})
  }
})

// Run server on selected port
app.listen(PORT, () =>
  console.log(`Server is up & running and listens on port ${PORT}`),
)

