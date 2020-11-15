require("dotenv").config({ path: "./config/.env" })

const PORT = process.env.PORT
const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY
console.log(PORT)


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


    // getWeather(latitute, longitude)
}



// const getWeather = async function(latitute, longitude) {

  // try {
  //   const res = await axios.get("api.openweathermap.org/data/2.5/weather?lat=latitute&lon=latitute&appid=OPEN_WEATHER_KEY&lang=pt")  
  //   console.log(res)

  // } catch (error) {
  //   console.log(("ERROR:", error));
  // }
  
// }