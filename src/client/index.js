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

// export as module
export{
	showNewSearch,
	showDestinations
}
 
