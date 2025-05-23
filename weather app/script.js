const getweather = () => {
  const city = document.getElementById('cityinput').value.trim();
  const apikey = '0175288bdad47440403fc180f0cf94e2';
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  const loader = document.getElementById("loader");
  const weatherInfo = document.getElementById("weatherInfo");

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  weatherInfo.classList.add("hidden");
  loader.classList.remove("hidden");

  fetch(apiurl)
    .then(res => res.json())
    .then(data => {
      loader.classList.add("hidden");

      if (data.cod !== 200) {
        weatherInfo.innerHTML = `<p style="color: red;">❌ City not found!</p>`;
        weatherInfo.classList.remove("hidden");
        return;
      }

      const description = data.weather[0].description;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const icon = data.weather[0].icon;
      const country = data.sys.country;

      const localTime = new Date().toLocaleTimeString();

      weatherInfo.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
        <h4>${city.toUpperCase()}, ${country}</h4>
        <p><strong>Time:</strong> ${localTime}</p>
        <p><strong>Description:</strong> ${description}</p>
        <h4><strong>Temperature:</strong> ${temperature} &#8451;</h4>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      `;

      weatherInfo.classList.remove("hidden");
    })
    .catch(error => {
      loader.classList.add("hidden");
      alert("Error fetching weather data.");
      console.error(error);
    });
};

const handleKey = (event) => {
  if (event.key === "Enter") {
    getweather();
  }
};
