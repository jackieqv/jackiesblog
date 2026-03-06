(() => {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const locationBtn = document.getElementById("locationBtn");
  const statusEl = document.getElementById("weatherStatus");
  const currentEl = document.getElementById("currentWeather");
  const forecastEl = document.getElementById("forecastGrid");

  const STORAGE_KEY = "weather_last_city";

  const weatherCodes = {
    0: "Klarer Himmel",
    1: "Überwiegend klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Neblig",
    48: "Raureif-Nebel",
    51: "Leichter Nieselregen",
    53: "Nieselregen",
    55: "Starker Nieselregen",
    56: "Leichter gefrierender Nieselregen",
    57: "Gefrierender Nieselregen",
    61: "Leichter Regen",
    63: "Regen",
    65: "Starker Regen",
    66: "Leichter gefrierender Regen",
    67: "Gefrierender Regen",
    71: "Leichter Schneefall",
    73: "Schneefall",
    75: "Starker Schneefall",
    77: "Schneegriesel",
    80: "Leichte Regenschauer",
    81: "Regenschauer",
    82: "Starke Regenschauer",
    85: "Leichte Schneeschauer",
    86: "Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit starkem Hagel"
  };

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    });
  }

  function renderCurrent(locationName, data) {
    const current = data.current;
    const daily = data.daily;

    if (!current) {
      currentEl.innerHTML = `<div class="weather-empty">Keine aktuellen Wetterdaten verfügbar.</div>`;
      return;
    }

    const temp = current.temperature_2m;
    const wind = current.wind_speed_10m;
    const code = current.weather_code;
    const desc = weatherCodes[code] || `Code ${code}`;

    const todayMin = daily?.temperature_2m_min?.[0];
    const todayMax = daily?.temperature_2m_max?.[0];

    currentEl.innerHTML = `
      <div class="current-top">
        <div>
          <div class="weather-location">${locationName}</div>
          <div class="weather-description">${desc}</div>
        </div>
        <div class="weather-temp">${Math.round(temp)}°C</div>
      </div>

      <div class="weather-meta">
        <div class="weather-meta-card">
          <span>Wind</span>
          <strong>${Math.round(wind)} km/h</strong>
        </div>
        <div class="weather-meta-card">
          <span>Min</span>
          <strong>${Math.round(todayMin)}°C</strong>
        </div>
        <div class="weather-meta-card">
          <span>Max</span>
          <strong>${Math.round(todayMax)}°C</strong>
        </div>
      </div>
    `;
  }

  function renderForecast(data) {
    const daily = data.daily;

    if (!daily || !daily.time || daily.time.length === 0) {
      forecastEl.innerHTML = "";
      return;
    }

    const items = daily.time.slice(0, 5).map((date, index) => {
      const min = Math.round(daily.temperature_2m_min[index]);
      const max = Math.round(daily.temperature_2m_max[index]);
      const code = daily.weather_code[index];
      const desc = weatherCodes[code] || `Code ${code}`;

      return `
        <article class="forecast-card">
          <div class="forecast-day">${formatDate(date)}</div>
          <div class="forecast-desc">${desc}</div>
          <div class="forecast-temps">
            <span>${min}°</span>
            <span>/</span>
            <span>${max}°</span>
          </div>
        </article>
      `;
    });

    forecastEl.innerHTML = items.join("");
  }

  async function fetchWeather(latitude, longitude, timezone = "auto") {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,weather_code,wind_speed_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
      `&timezone=${encodeURIComponent(timezone)}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  async function geocodeCity(city) {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}` +
      `&count=1&language=de&format=json`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return null;
    }

    const result = data.results[0];
    return {
      name: [result.name, result.admin1, result.country].filter(Boolean).join(", "),
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone || "auto"
    };
  }

  async function loadCity(city) {
    setStatus("Suche Stadt ...");
    forecastEl.innerHTML = "";

    try {
      const place = await geocodeCity(city);

      if (!place) {
        setStatus("Stadt nicht gefunden.");
        currentEl.innerHTML = `<div class="weather-empty">Bitte versuche eine andere Schreibweise.</div>`;
        return;
      }

      const weatherData = await fetchWeather(place.latitude, place.longitude, place.timezone);
      renderCurrent(place.name, weatherData);
      renderForecast(weatherData);
      setStatus("");
      localStorage.setItem(STORAGE_KEY, city);
    } catch (error) {
      setStatus("Wetterdaten konnten nicht geladen werden.");
      currentEl.innerHTML = `<div class="weather-empty">Beim Laden ist ein Fehler aufgetreten.</div>`;
    }
  }

  async function loadLocation(latitude, longitude) {
    setStatus("Lade Wetterdaten für deinen Standort ...");
    forecastEl.innerHTML = "";

    try {
      const weatherData = await fetchWeather(latitude, longitude, "auto");
      renderCurrent("Mein Standort", weatherData);
      renderForecast(weatherData);
      setStatus("");
    } catch (error) {
      setStatus("Standort-Wetter konnte nicht geladen werden.");
      currentEl.innerHTML = `<div class="weather-empty">Beim Laden ist ein Fehler aufgetreten.</div>`;
    }
  }

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
      setStatus("Bitte gib eine Stadt ein.");
      return;
    }
    loadCity(city);
  });

  cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });

  locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation wird von deinem Browser nicht unterstützt.");
      return;
    }

    setStatus("Standort wird abgefragt ...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setStatus("Standort konnte nicht abgerufen werden.");
      }
    );
  });

  const lastCity = localStorage.getItem(STORAGE_KEY);
  if (lastCity) {
    cityInput.value = lastCity;
    loadCity(lastCity);
  }
})();
