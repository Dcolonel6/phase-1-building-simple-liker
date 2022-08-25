// Defining text characters for the empty and full hearts for you to use later.
'use strict';
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// When a user clicks on an empty heart:
// Invoke mimicServerCall to simulate making a server request
// When the "server" returns a failure status:
// Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
// Display the error modal by removing the .hidden class
// Display the server error message in the modal
// Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
// When the "server" returns a success status:
// Change the heart to a full heart
// Add the .activated-heart class to make the heart appear red
// When a user clicks on a full heart:
// Change the heart back to an empty heart
// Remove the .activated-heart class
// Keep all your styling rules entirely in style.css. Do not manipulate any .style properties.
// Only manipulate the DOM once the server request responds. Do not make the heart full until you're inside a successful .then block.

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded',() => {
  const modal = document.querySelector('#modal')
  const allHearts = document.querySelectorAll('.like-glyph')    

  //add event listener to all spans with a class of like-glyph
  for(const heart of allHearts){
    heart.addEventListener('click',heartHandler)
  }
  
  
})
function heartHandler(event){  
  const {target} = event  

  //check if heart is empty then call mimicServerCall
  if(!target.classList.contains('activated-heart')){
    mimicServerCall()
    .then((response) => {
      target.classList.add('activated-heart')
      target.textContent = FULL_HEART
    })
    .catch((err) => {
      errorHandler(err.message)      
    })
  }
  else{
    //has been liked therefore unlike
    target.classList.remove('activated-heart')
    target.textContent = EMPTY_HEART
  }

}
function errorHandler(message){
  const modalMessage = document.querySelector('#modal-message')
  const modl = document.querySelector('#modal')  
  modl.classList.remove('hidden')  
  modalMessage.textContent = message
  hideModal(modl)

}
function hideModal(modal){
  setTimeout(()=> modal.classList.add('hidden'),3000)
}




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
