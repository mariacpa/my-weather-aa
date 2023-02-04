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
  ctemp = response.data.temperature.current;
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
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function showCurrentCity(response) {
  let h1 = document.querySelector("h1");
  let inputCity = response.data.city;
  h1.innerHTML = inputCity;
}
function showPositionCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let keyApi = "34a7d5053503ta79c57d5oafb4d7bb21";
  let units = "metric";
  let apiUrlCity = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${keyApi}&units=${units}`;
  axios.get(apiUrlCity).then(showCurrentCity);
}

let searchCity = document.querySelector("#search-city-form");
searchCity.addEventListener("submit", displayCity);

function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let keyApi = "34a7d5053503ta79c57d5oafb4d7bb21";
  let units = "metric";
  let apiUrlTemp = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${keyApi}&units=${units}`;
  axios.get(apiUrlTemp).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPositionTemp);
  navigator.geolocation.getCurrentPosition(showPositionCity);
}

let button = document.querySelector("#currentCity-button");
button.addEventListener("click", getCurrentPosition);

function convertToFarenheit(event) {
  event.preventDefault();
  let ftempValue = document.querySelector("#tempvalue");
  farenheitSymbol.classList.add("bold-symbols");
  celsiusSymbol.classList.remove("bold-symbols");
  ftempValue.innerHTML = Math.round(ctemp * (9 / 5) + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let ctempValue = document.querySelector("#tempvalue");
  celsiusSymbol.classList.add("bold-symbols");
  farenheitSymbol.classList.remove("bold-symbols");
  ctempValue.innerHTML = Math.round(ctemp);
}

let celsiusSymbol = document.querySelector("#celsius");
let farenheitSymbol = document.querySelector("#farenheit");
celsius.addEventListener("click", convertToCelsius);
farenheit.addEventListener("click", convertToFarenheit);

let ctemp = null;
