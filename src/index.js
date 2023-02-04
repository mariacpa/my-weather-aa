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
  let apiKey = "34a7d5053503ta79c57d5oafb4d7bb21";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCity.value}&units=${units}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let tempvalue = document.querySelector("#tempvalue");
  tempvalue.innerHTML = Math.round(response.data.temperature.current);
  let temFeelsLike = document.querySelector("#tempFeelslike");
  temFeelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;
  let iconToday = document.querySelector("#icon-today");
  iconToday.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
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
  let apiUrlCity = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${keyApi}&units=${units}`;
  axios.get(apiUrlCity).then(showCurrentCity);
}

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", displayCity);

function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let keyApi = "34a7d5053503ta79c57d5oafb4d7bb21";
  let apiUrlTemp = `https://api.shecodes.io/weather/v1/current?lon=${lon}&latn=${lat}&&key=${keyApi}&units=metric`;
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
