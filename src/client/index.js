//importing stlyles
import "./styles/main.scss";
//importing main functions from the js scripts
import { formValidation } from './js/formHandler';
import { createNewTripHtml } from './js/UIbuilder';
import { scrollToSection, showToDoListPopup, toggleTripCreateSection, showErrorMessage } from './js/helpFunctions';
import { getDataFromAPIs, addDestinations, saveNewTrip, updateForm } from './js/searchTrips';

//this array will contain multi Object Destinations
let newTripHolder = [];

//importing pixabayImage, require when using their api
import pixabayImage from './media/icons/pixabay-logo.png'
// // adding the pixabay logo to the footer to comply with copyrights 
const pixabay = document.getElementById('pixabay')
pixabay.setAttribute('src', pixabayImage)

const createNewTripBlock = (data) => {

    //DATA should be the newTripHolder
    console.log("app.js Data for createNewTripBlock:\n",data);
    //get the DOM
    const newTripBlock = document.getElementById('new-trip');
    newTripBlock.innerHTML = '';
   
    //display the newTripBlock in the browser
    newTripBlock.appendChild(createNewTripHtml(data));
   
}

/***************************SERVICE WORKERS************************** */
// // Checks if serviceworker is available
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
    
 /********************************************************************** */

/* ========= */
/* =========== START EXECUTION PART ============= */
/* ========= */

document.addEventListener('DOMContentLoaded', () => {
    
    //get the DOM
    const searchBtn = document.getElementById('search');
    const newTripBlock = document.getElementById('new-trip');
    const popupCloseBtn = document.querySelectorAll('.js-popup-close');
    const saveToDoBtn = document.querySelector('.save-to-do');
    const navLink = document.querySelector('nav a');

    // Event Listener: Click => on search button;
    searchBtn.addEventListener('click', () => {
            
            //check if the button is not disabled
            if(!searchBtn.classList.contains('disabled')) {
                
                console.log("Search button not disable, press to run");
                
                let userData = formValidation()
                //check the form data(validation)
                if(userData) {
                    console.log("User data good to go!")
                    toggleTripCreateSection('loading'); // show loading gif
                    scrollToSection('trip-create');
                    
                    //start to generate the data(from APIs)
                    getDataFromAPIs(userData)
                    .then(newTripDestination => {
                       
                        console.log("Generating the data from the APIs")
                       
                        if(newTripDestination.error) {

                            toggleTripCreateSection() //hide the section
                            scrollToSection('trip-form'); //scroll back to form
                            
                            showErrorMessage(newTripDestination.error);
                            
                            //enable the search btn
                            document.getElementById('search').classList.remove('disabled');
                            
                        } 
                        
                        else {
                         console.log("Adding a new destination the the tripHolder object")   

                        //add a new destination to tripHolder object
                        newTripHolder.push(newTripDestination);

                        createNewTripBlock(newTripHolder);
                        //updateForm();
                        toggleTripCreateSection('active'); //show the content

                        }
                        
                    });
                    
                }
            }
        
       

    });

    
    // Event Listener: Click
    newTripBlock.addEventListener('click', (event) => {
        
        // Click => Add More Destinations;
        if(event.target.getAttribute('id') == 'add-more-destination') { 
            addDestinations(newTripHolder);
        }

        // Click => Save New Trip;
        if(event.target.getAttribute('id') == 'save-new-trip') { 
            if(saveNewTrip(newTripHolder)) newTripHolder = [];
        }

        //Click => Open To Do List Popup
        if(event.target.classList.contains('add-to-do')) {
            
            //get the Dest index in newTrip array
            const tripDestNr = event.target.closest('.new-dest-actions').getAttribute('data-dest-nr');
            showToDoListPopup(tripDestNr);
        }
       
    }, true)


    // Event Listener: Click => Close Pop up Message Block 
    popupCloseBtn.forEach(element => {
        element.addEventListener('click',function(event){
            element.closest('.full-screen').classList.remove('active');
            
        },true);
    });

    // Event Listener: Click => Navigation link and scroll to All trips
    navLink.addEventListener('click', (event) => {
        
        event.preventDefault();
        //scrollToSection(event.target.dataset.nav);
    });

    // Event Listener: Click => Save To DO List
    saveToDoBtn.addEventListener('click',function(event){
        newTripHolder = saveToDoList(newTripHolder);
        createNewTripBlock(newTripHolder);
    },true);

});


const saveToDoList = (data) => {
    
        const toDoListText = document.querySelector('input[name="to-do-list"]').value;
        const tripDestNr = document.querySelector('input[name="trip-dest-nr"]').value;
        
        if(toDoListText.length > 3) {
            
            data[tripDestNr].toDoList.push(toDoListText);
            document.getElementById('to-do-list').classList.remove('active');
            
        }

        //return modified newTripHolder
        return data;
        

        
}


