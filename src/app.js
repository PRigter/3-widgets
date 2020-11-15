require("dotenv").config()
const axios =  require("axios")

const PORT = process.env.PORT
const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY
console.log(PORT)


const tempDisplay = document.querySelector(".weather-temp")
const tempDescDisplay = document.querySelector(".weather-description")
const tempCityDisplay = document.querySelector(".weather-city")
const tempImageDisplay = document.querySelector(".weather-img")

// Add HTML Geolocation 

window.addEventListener("load", function() {
    getLocation()
    
})


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}



const showPosition = function(position) {
    console.log(position);
    let latitute = position.coords.latitude
    let longitude = position.coords.longitude

    console.log(latitute, longitude)


    getWeather(latitute, longitude)
}



const getWeather = async function(latitute, longitude) {

  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitute}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=pt` 

    const res = await axios.get(weatherURL)  
    console.log(res)
    // console.log(res.data)

    tempDisplay.innerText = res.data.main.temp + " ºC"
    tempDescDisplay.innerHTML = res.data.weather[0].description 
    tempCityDisplay.innerHTML = res.data.name
    tempImageDisplay.src = "assets/cloud.png"

  } catch (error) {
    console.log(("ERROR:", error));
  }
  
}