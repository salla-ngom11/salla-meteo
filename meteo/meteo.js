const API_KEY = "f486e3eecaf9ce6b5cd8b0e0c8ec8630";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn  = document.getElementById("searchBtn");
const card       = document.getElementById("card");
const cityNameEl = document.getElementById("cityName");
const tempEl     = document.getElementById("temp");
const descEl     = document.getElementById("desc");
const iconEl     = document.getElementById("icon");
const errorMsg   = document.getElementById("errorMsg");

searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") fetchWeather();
});

function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;

  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error("Ville introuvable");
      return r.json();
    })
    .then(showWeather)
    .catch(err => showError(err.message));
}

function showWeather(data) {
  errorMsg.classList.add("hidden");
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent     = `${Math.round(data.main.temp)}°C`;
  descEl.textContent     = data.weather[0].description;
  iconEl.src             = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt             = data.weather[0].main;
  card.classList.remove("hidden");
}

function showError(msg) {
  card.classList.add("hidden");
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
}
