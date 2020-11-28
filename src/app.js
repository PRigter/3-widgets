require("dotenv").config()
const axios = require("axios")

const PORT = process.env.PORT
const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY
console.log(PORT)

// Parcel Audio Setup
  // Must be loaded as a path (either require, import or workers)
  // Easy Solution is adding a require to resolve into a url 
      // And copy the file into "dist"
let slideSoundURL = ("./sounds/cartoon_pop.mp3")
let spreadSoundURL = ("./sounds/cam_flash_popup.mp3")
let slideSound = new Audio(slideSoundURL)
let spreadSound = new Audio(spreadSoundURL)

// GLOBAL VARIABLES
const starterContainer = document.querySelector("#starter-container")
const starterIcon = document.querySelector("#starter-icon")
const starterButton = document.querySelector("#starter-btn")
const mainContainer = document.querySelector("#main-container")
const weatherCard = document.querySelector("#weather-card")
const bitcoinCard = document.querySelector("#bitcoin-card")
const quoteCard = document.querySelector("#quote-card")
const button = document.querySelector("#spread-btn")

const tempDisplay = document.querySelector(".weather-temp")
const tempDescDisplay = document.querySelector(".weather-description")
const tempCityDisplay = document.querySelector(".weather-city")
const tempImageDisplay = document.querySelector(".weather-img")
const coinPrice = document.querySelector(".coin-price")
const coinPriceChange = document.querySelector(".coin-price-change")

// On Load Functions
window.addEventListener("load", function() {
    getLocation()
    // fetchBitcoinPrice()  
})

// HTML Geolocation
function getLocation() {
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(showPosition, function (error) {
      console.log(error)
      if (error.code === error.PERMISSION_DENIED) {
        console.log("No tracking !")

        // starterButton.removeEventListener("click", function () {
        //   console.log("1")
        // })
        
      }
    })
    
  } else {
    console.log("Geolocation is not supported by this browser.")

  }
}


const secMove = function(element, time) {
  for (let el of element) {
      setTimeout(function() {
          el.classList.remove("move")
          el.classList.remove("move-sec")    
          el.classList.remove("move-third")   
      }, time)
  }

}

const playSlideSound = async function() {
  await slideSound.play()
  setTimeout(function() {
      slideSound.play()
  }, 430)
  setTimeout(function() {
    slideSound.play()
  }, 860)

}



const showPosition = function(position) {
    console.log(position);
    let latitute = position.coords.latitude
    let longitude = position.coords.longitude
    console.log(latitute);
    
    starterButton.classList.remove("loading")
    starterIcon.classList.add("play")
    getWeather(latitute, longitude)
 

}





const getWeather = async function(latitute, longitude) {

  try {
    
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=pt`  

    const res = await axios.get(weatherURL)  
    console.log(res)
    // console.log(res.data)

    tempDisplay.innerText = res.data.main.temp + " ºC"
    tempDescDisplay.innerText = res.data.weather[0].description 
    tempCityDisplay.innerText = res.data.name
    // tempImageDisplay.src = "./assets/cloud.png" //! to be fixed

  } catch (error) {
    console.log(("ERROR:", error));
  }
  
}



// Get Bitcoin Price
const fetchBitcoinPrice = async function() {
  try {
    const res = await axios.get("https://api.cryptonator.com/api/ticker/btc-usd")

    coinPrice.innerText = res.data.ticker.price
    


  } catch (error) {
    console.log("ERROR:" , error);
  }

}



function cardsAnimation() {
  if (showPosition) { console.log("we have position for card Animation");}


  const starterCard = document.querySelector("#starter-card")
  const mainCard = document.querySelectorAll(".main-card")

  starterCard.classList.add("move-starter")
  setTimeout(function() {
      starterContainer.style.display = "none"
  }, 800)

  setTimeout(function() {
      mainContainer.style.display = "flex"
  }, 810)


  setTimeout(function() {
      weatherCard.classList.remove("offset")
      weatherCard.classList.add("move")
      

      bitcoinCard.classList.remove("offset")
      bitcoinCard.classList.add("move-sec")
      

      quoteCard.classList.remove("offset")
      quoteCard.classList.add("move-third")

      secMove(mainCard, 2100)
  }, 850)

  setTimeout(function() {
      button.style.opacity = "1"
  }, 4300)

  setTimeout(function() {
      playSlideSound()
  }, 980)
}


// EVENT LISTENER

// starterButton.addEventListener("click", function() {
//   if (showPosition) {
//     cardsAnimation()
//   }
// })

button.addEventListener("click", function() {
  // spreadSound.play()
  weatherCard.classList.toggle("move")
  bitcoinCard.classList.toggle("move-sec-button")
  quoteCard.classList.toggle("move-third-button")
})