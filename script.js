let place = document.querySelector("#location");

let weatherImage = document.querySelector("#weather_image");
let weatherVal = document.querySelector("#weather_value");
let weatherType = document.querySelector("#weather_type");
let iconfile;
const searchBtn = document.querySelector("#search_button");
const searchInput = document.querySelector("#search_input");

searchBtn.addEventListener("click", (event) => {
  //listening for click on the search button

  event.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";

  // prevents what would have happened when you click the search button
  //in this case the page refreshes when you click search
});
const getWeather = async (city) => {
  try {
    const response = await fetch(
      `//api.openweathermap.org/data/2.5/weather?q=${city}&appid=aed4ce559e2dcb3be5ca4e99c9f7190c`
    );

    const weatherData = await response.json();
    console.log(weatherData);
    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];

    place.textContent = name;
    weatherType.textContent = main;
    weatherVal.textContent = Math.round(feels_like - 273);

    if (id < 300 && id > 200) {
      weatherImage.src = "thunderstorm.png";
    } else if ((id < 400 && id > 300) || (id < 800 && id > 700)) {
      weatherImage.src = "008-cloudy-2.svg";
    } else if (id < 600 && id > 500) {
      weatherImage.src = "005-rain-1.svg";
    } else if (id < 700 && id > 600) {
      weatherImage.src = "snowflake.png";
    } else {
      weatherImage.src = "003-cloudy-1.svg";
    }
  } catch (err) {
    console.log("error");
    place.textContent = "city not found";
    weatherType.textContent = "N/A";
    weatherVal.textContent = "N/A";
    weatherImage.src = " ";
  }
};

window.addEventListener("load", () => {
  //load is fired when whole page has loaded.
  //when the page loads the content here is carried out

  let long; //declaring longitude variable
  let lat; //declaring longitude variable

  if (navigator.geolocation) {
    //The entry point into the API.
    //Returns a Geolocation object instance
    navigator.geolocation.getCurrentPosition((position) => {
      // this is used to get the crrent location of your device

      long = position.coords.longitude; //longitude of the user
      lat = position.coords.latitude; // latitude of the user

      //   const proxy = "http://cors-anywhere.herokuapp.com/corsdemo";

      const api = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aed4ce559e2dcb3be5ca4e99c9f7190c  `;
      //open weather api

      fetch(api)
        .then((response) => {
          //fetching api and returning data in JSON form
          return response.json();
        })

        .then((data) => {
          // using the data from the api

          const { name } = data;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];

          place.textContent = name;
          weatherType.textContent = main;
          weatherVal.textContent = Math.round(feels_like - 273);
          if (id < 300 && id > 200) {
            weatherImage.src = "thunderstorm.png";
          } else if ((id < 400 && id > 300) || (id < 800 && id > 700)) {
            weatherImage.src = "008-cloudy-2.svg";
          } else if (id < 600 && id > 500) {
            weatherImage.src = "005-rain-1.svg";
          } else if (id < 700 && id > 600) {
            weatherImage.src = "snowflake.png";
          } else if (id == 800) {
            weatherImage.src = "sun.svg";
          }
          console.log(data);
        });
    });
  }
});
