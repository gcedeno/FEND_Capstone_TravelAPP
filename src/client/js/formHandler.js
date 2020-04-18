//Getting the active port from the server configuration
import { PORT } from '../../server/server'
// clearing the UI and showing new destinations
export const showDestinations = () => {
  clearResults()
  getDestinations()
}

// fetching destination data and adding event listener to remove buttons based on the trip id
export const getDestinations = async () => {
  try {
    const result = await fetch(`http://localhost:${PORT}/destinations`)
    const trips = await result.json()
    clearResults()
    //clearError()
    if (trips.length > 0) {
      trips.forEach(trip => createTrip(trip))
      addEventListenersToRemoveButtons()
    }
  } catch (e) {
    setError("Ups, we are not getting any destinations. Please give it another try!.")
  }
} 

// In case there is no image available from pixabay
import fallbackImage from '../media/image-not-available.png'

// Creating a trip based on inputs
const createTrip = trip => {
  const {location, img, date, id, difference, weather} = trip
  const tripHtml = `<div class="trip"">
    <div id="trip-image">
      <img src="${img || fallbackImage}" alt="${location}" />
    </div>
    <div id="trip-data">
      <h2 id="trip-location">My trip to: ${location}</h2>
      <h3 id="trip-time">Departing: ${date}</h3>
      <div id="trip-buttons">
        <button disabled>Save Trip</button>
        <button id="remove" data-key="${id}">Remove Trip</button>
      </div>
      <p id="trip-waiting-time">${location} is ${difference} days away</p>
        ${
          weather.high && weather.low && weather.summary
            ? `<div id="trip-weather">
            <div id="trip-weather-data">
              <p id="trip-weather-headline">Typical weather for then is:</p>
              <p id="trip-weather-conditions">
                High – ${weather.high}, Low – ${weather.low}
              </p>
              <p id="trip-weather-summary">${weather.summary}</p>
              </div>
          </div>`
            : '<p>No weather forecast available</p>'
        }
        
    </div>
  </div>`
  addTripToDOM(tripHtml)
}


// Adding a destination to the DOM
const addTripToDOM = trip => {
  let results = document.getElementById('results')
  if (!results) {
    results = "<section id='results'></section>"
    document.querySelector('main').insertAdjacentHTML('afterbegin', results)
  }
  document.getElementById('results').insertAdjacentHTML('beforeend', trip)
}

// Clear previous query results
const clearResults = () => {
  const results = document.getElementById('results')
  results && results.remove()
}

// Adding event listener to remove buttons
const addEventListenersToRemoveButtons = () => {
  const tripRemoveButtons = document.querySelectorAll('.trip #remove')
  tripRemoveButtons.forEach(trip => {
    trip.addEventListener('click', () => removeTrip(trip.dataset.key))
  })
}

