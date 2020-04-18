//Getting the active port from the server configuration
import { PORT } from '../../server/server'
// Using the geDestinations function from the formHandler
import {getDestinations} from './formHandler'
//New function for displaying new destinations seach
export const showNewSearch = async () => {
    setMinDate()
    handleForm()
}
// Dynamically setting the minimum date for searching new destinations
const setMinDate = () => {
    const date = new Date()
    const minDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`
  
    const departDate = document.getElementById('search-trip-date')
    departDate.setAttribute('min', minDate)
  }

// Manipulating the DOM and adding event handlers for the Form
const handleForm = () => {
    const save = document.getElementById('search-trip-save')
    const reset = document.getElementById('search-trip-reset')
    const form = document.getElementById('search-trip-form')
    const input = document.getElementById('search-trip-location')
  
    form.addEventListener('submit', handleSubmit)
    input.addEventListener('input', handleInput)
    save.addEventListener('click', handleSubmit)
    reset.addEventListener('click', () => form.reset())
  }
// Saving a destination to the API and fetching destinations
const saveTrip = async (location, date) => {
  const result = await fetch('http://localhost:3000/destination', {
    // const result = await fetch(`http://localhost:${PORT}/destination`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({location, date}),
    })
    if (!result.ok) {
       setFormError("Ups, we are not able to save your destination. Please give it another try!.")
    } else {
      const form = document.getElementById('search-trip-form').reset()
      getTrips()
    }
  }

// Creating a datalist for Cities proposals
const createDataList = proposals => {
    removeDataList()
    const input = document.getElementById('search-trip-location')
    input.insertAdjacentHTML(
      'afterend',
      '<datalist id="search-trip-locations"></datalist>',
    )
    const dataList = document.getElementById('search-trip-locations')
    proposals.forEach(({location}) =>
      dataList.insertAdjacentHTML(
        'beforeend',
        `<option value="${location}">${location}</option>`,
      ),
    )
  }

// Fetching city proposals from the API on input in case of more than 4 chars
const handleInput = async e => {
    const {value} = e.target
    if (value.length >= 4) {
      return
    }
    // const result = await fetch(`http://localhost:${PORT}/proposals?term=${value}`)
    const result = await fetch(`http://localhost:3000/proposals?term=${value}`)
    const proposals = await result.json()
    createDataList(proposals)
  }

// The function that handles the interaction with the form
//saves a destination or sets an error
const handleSubmit = event => {
    event.preventDefault()
    removeFormError()
    const location = document.getElementById('search-trip-location').value
    const date = document.getElementById('search-trip-date').value
    if (location && date) {
      saveTrip(location, date)
    } else {
      setFormError()
    }
  }
// exporting in case needed in another script TBD
export { handleSubmit }
