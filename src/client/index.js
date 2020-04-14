// import main app functions
import { somefunction } from './js/app.js'
import { handleSubmit } from './js/formHandler'

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
somefunction()
handleSubmit()

// export as module
export{
	somefunction,
	handleSubmit
}
 
