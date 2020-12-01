require("dotenv").config()
const axios = require("axios")

const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY

//* PARCEL AUDIO SETUP
  // Must be loaded as a path (either require, import or workers)
  // Easy Solution is adding a require to resolve into a url 
      // And copy the file into "dist"
let slideSoundURL = ("./sounds/zen_warm.mp3")
let spreadSoundURL = ("./sounds/zen_tone_1.mp3") 
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
const priceChangeDisplay = document.querySelector(".price-change")
const quoteDescDisplay = document.querySelector(".quote-description")
const quoteAuthorDisplay = document.querySelector(".quote-author")


// On Load Functions
window.addEventListener("load", function() {
    getLocation()
    fetchBitcoinPrice()  
    fetchInspirationQuote() 
})


//* NAVIGATOR GEOLOCATION 
// HTML Geolocation
function getLocation() {
  if (navigator.geolocation) {
    // Accepts 2 callbacks, the 2nd is for Error Handling - In case User does not allow Geolocation
    navigator.geolocation.getCurrentPosition(showPosition, function (error) {
      console.log(error)
      if (error.code === error.PERMISSION_DENIED) {
        console.log("Location not accepted")
      }
    })
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}


// Recieves data/coords from navigator.geolocation.getCurrentPosition Function
const showPosition = function(position) {
    let latitute = position.coords.latitude
    let longitude = position.coords.longitude
    
    starterButton.classList.remove("loading")
    starterIcon.classList.add("play")
    getWeather(latitute, longitude)
    starterButton.addEventListener("click", cardsAnimation)
}


//* FETCH WEATHER
// Get Weather from Open Weather Map API -- IF we have position coords from aboVE
const getWeather = async function(latitute, longitude) {
  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=pt`  
    const res = await axios.get(weatherURL)  
    let temp = res.data.main.temp

    tempDisplay.innerText = temp.toFixed() + " ºC"
    tempDescDisplay.innerText = res.data.weather[0].description 
    tempCityDisplay.innerText = res.data.name
    tempImageDisplay.src = "./assets/cloud.png"
  } catch (error) {
    console.log(("ERROR:", error));
  }
}


//* FETCH BITCOIN PRICE
// Get Bitcoin Price from Cryptonator API
const fetchBitcoinPrice = async function() {
  try {
    const res = await axios.get("https://api.cryptonator.com/api/ticker/btc-usd")
    let price = res.data.ticker.price
    let priceChange = res.data.ticker.change

    coinPrice.innerText = Math.round(price)
    priceChangeDisplay.innerText = Math.round(priceChange)
  } catch (error) {
    console.log("ERROR:" , error);
  }
}


//* FETCH INSPIRATION QUOTE
// Fetch Inspiration Quote from Forismatic API
const fetchInspirationQuote = async function() { 
  try {
    const res = await axios.get("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json")
    quoteDescDisplay.innerText = res.data.quoteText
    quoteAuthorDisplay.innerText = res.data.quoteAuthor
  } catch (error) {
    console.log(error);
  }
}


//* ANIMATION OF CARDS / WIDGETS
function cardsAnimation() {
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
      slideSound.play()
  }, 1000)
}


// 2ND ANIMATION / TRANSITION
const secMove = function(element, time) {
  for (let el of element) {
    setTimeout(function() {
      el.classList.remove("move")
      el.classList.remove("move-sec")
      el.classList.remove("move-third")
    }, time)
  }
}


// EVENT LISTENER
button.addEventListener("click", function() {
  spreadSound.play()
  weatherCard.classList.toggle("move")
  bitcoinCard.classList.toggle("move-sec-button")
  quoteCard.classList.toggle("move-third-button")
  weatherCard.classList.toggle("fill")
})