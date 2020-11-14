require("dotenv").config({ path: "./config/.env" })

const PORT = process.env.PORT

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


  }


  const getWeather = async function() {
    axios.get("api.openweathermap.org/data/2.5/weather?lat=38.701946307692296&lon=-9.29318969230769&appid=openweathermapKEY&lang=pt")
  }
