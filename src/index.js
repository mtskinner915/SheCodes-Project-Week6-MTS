let currentTime = new Date();
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
let finalDate = document.querySelector("#today-time");
finalDate.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function displayWeatherDetails(response) {
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#main-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function getCity(city) {
  let apiKey = "0f870e1ed1186b4aa36772e8d255cf47";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherDetails);
}

function searchCitySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  getCity(city);
}
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", searchCitySubmit);

getCity("New York");

function showWeather(response) {
  let currentCity = response.data.name;
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = `${currentCity}`;
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = currentTemperature;
  document.querySelector("#main-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#main-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchLocation(position) {
  console.log(position);
  let apiKey = "0f870e1ed1186b4aa36772e8d255cf47";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
