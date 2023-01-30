/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.toLowerCase();
city = city.trim();

if (weather[city] !== undefined) {
  let cTemp = Math.round(weather[city].temp);
  let fTemp = Math.round((weather[city].temp * 9) / 5 + 32);
  let humidity = weather[city].humidity;

  alert(
    `It is currently ${cTemp}°C (${fTemp}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}*/

function getDateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let day = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayName = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let date = document.querySelector("#day-time-now");
  let timeNow = `${hour}:${minutes}`;
  if (minutes < 10) {
    timeNow = `${hour}:0${minutes}`;
  }
  let dateTime = `${day} ${month} ${year} (${dayName}) ${timeNow}`;
  date.innerHTML = dateTime;
}

getDateTime();

function displayCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let inputCity = document.querySelector("#input-city");
  h1.innerHTML = inputCity.value;
  let apiKey = "dff5c692192605ee5ed7f95b423ae857";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let tempvalue = document.querySelector("#tempvalue");
  tempvalue.innerHTML = Math.round(response.data.main.temp);
  let temMinMax = document.querySelector("#temp-min-max");
  temMinMax.innerHTML = `Min: ${Math.round(
    response.data.main.temp_min
  )} Max:  ${Math.round(response.data.main.temp_max)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.temp}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  console.log(response.data);
}

function showCurrentCity(response) {
  let h1 = document.querySelector("h1");
  let inputCity = response.data[0].name;
  h1.innerHTML = inputCity;
}
function showPositionCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let keyApi = "dff5c692192605ee5ed7f95b423ae857";
  let units = "metric";
  let apiUrlCity = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${keyApi}&units=${units}`;
  axios.get(apiUrlCity).then(showCurrentCity);
}

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", displayCity);

function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let keyApi = "dff5c692192605ee5ed7f95b423ae857";
  let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric`;
  axios.get(apiUrlTemp).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPositionTemp);
  navigator.geolocation.getCurrentPosition(showPositionCity);
}

let button = document.querySelector("#currentCity-button");
button.addEventListener("click", getCurrentPosition);

/*function convertToFarenheit(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#tempvalue");
  let ctemp = Math.round(tempValue * (9 / 5) + 32);
  tempValue.innerHTML = ctemp;
  let farenheitSymbol = document.querySelector("#farenheit");
  farenheitSymbol.classList.add("bold-symbols");
  let celsiusSymbol = document.querySelector("#celsius");
  celsiusSymbol.classList.remove("bold-symbols");
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let tempValue = document.querySelector("#tempvalue");
  let fTemp = Math.round((tempValue - 32) * 5) / 9;
  tempValue.innerHTML = fTemp;
  let celsiusSymbol = document.querySelector("#celsius");
  celsiusSymbol.classList.add("bold-symbols");
  let farenheitSymbol = document.querySelector("#farenheit");
  farenheitSymbol.classList.remove("bold-symbols");
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);*/
