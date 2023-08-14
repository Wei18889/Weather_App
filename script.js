const apiKey = "543002caf9995f9afabb7a2283601613";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const userSearch = document.querySelector(".search input");
const userSearchBtn = document.querySelector(".search button");
const forecastContainer = document.querySelector(".week-report .forecast");

const forecastData = [
  { day: 'Mon', temperature: '22°C', weather: 'Sunny' },
  { day: 'Tue', temperature: '19°C', weather: 'Cloudy' },
  { day: 'Wed', temperature: '17°C', weather: 'Rainy' },
  { day: 'Thu', temperature: '20°C', weather: 'Partly Cloudy' },
  { day: 'Fri', temperature: '25°C', weather: 'Sunny' },
];

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);
  const data = await response.json();

  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°F";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " mph";
  document.querySelector(".weather").style.display = "block";
}

function generateForecastHTML(data) {
  let forecastHTML = '';
  data.forEach(item => {
    forecastHTML += `
      <div class="day">
        <div class="day-name">${item.day}</div>
        <div>${item.temperature}</div>
        <div>${item.weather}</div>
      </div>
    `;
  });
  return forecastHTML;
}

// Render the forecast HTML
forecastContainer.innerHTML = generateForecastHTML(forecastData);

userSearchBtn.addEventListener("click", () => {
  const city = userSearch.value;
  checkWeather(city);
});

getCurrentDate();
