alert("I am running")
// import main app functions
import { showNewSearch } from './js/app'
import { showDestinations } from './js/formHandler'

//import styles
import './styles/resets.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/base.scss'
import './styles/header.scss'
import './styles/messages.scss'

//importing pixabayImage, require when using their api
import pixabayImage from './media/pixabay-logo.png'

//Calling and using main functions imported from the js scripts
showNewSearch()
showDestinations()

// adding the pixabay logo to the footer to comply with copyrights 
const pixabay = document.getElementById('pixabay')
pixabay.setAttribute('src', pixabayImage)

// Checks if serviceworker is available
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

// Initial check if offline
if (!navigator.onLine) {
	showOfflineMessage()
  }
  
  // Event listener for being online again
  window.addEventListener('online', () => {
	const elements = retrieveInputs()
	elements.forEach(el => {
	  if (el.hasAttribute('id')) {
		el.removeAttribute('disabled')
	  }
	})
	removeOfflineMessage()
  })
  
  // Event listener for being offline
  window.addEventListener('offline', () => {
	const elements = retrieveInputs()
	elements.forEach(el => {
	  el.setAttribute('disabled', 'disabled')
	})
	showOfflineMessage()
  })
  
  // removes the message when user turn online again
  const removeOfflineMessage = () => {
	const offline = document.getElementById('offline')
	if (offline) {
	  offline.remove()
	}
  }
  
  // shows an message at the top of the page that the user turned offline
  const showOfflineMessage = () => {
	const first = document.querySelector('main')
	if (document.getElementById('offline')) {
	  return
	}
	const offline = "<p id='offline'>You seem to be offline!</p>"
	first.insertAdjacentHTML('afterbegin', offline)
  }
  
  // Disable all inputs and buttons
  const retrieveInputs = () => {
	const buttons = document.querySelectorAll('button')
	const inputs = document.querySelectorAll('input')
	return [...inputs, ...buttons]
  }
// export as module
export{
	showNewSearch,
	showDestinations
}
 
