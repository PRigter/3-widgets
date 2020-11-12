const dotenv = require("dotenv").config({ path: "./config/.env" })

// const PORT = process.env.PORT

// console.log(PORT)


// Add HTML Geolocation 

// window.addEventListener("load", function() {
//     getLocation()
// })

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}


let latitute = ""
let longitude = ""

const coords = function showPosition(position) {
    console.log(position);
    return position.coords.latitute, position.coords.longitude
    // let latitude = 38.701946307692296
    // let longitude = -9.29318969230769

  }


//   api.openweathermap.org/data/2.5/weather?lat=38.701946307692296&lon=-9.29318969230769&appid=openweathermapKEY&lang=pt
