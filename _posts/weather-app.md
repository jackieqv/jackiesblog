---
title: "Weather App"
published: true
categories:
  - Weather
layout: page
title: Wetter
permalink: /wetter/
---

<link rel="stylesheet" href="/assets/css/weather.css">

<div class="weather-card">
  <h2>Wetter</h2>

  <div class="weather-row">
    <input id="city" type="text" placeholder="Stadt (z.B. Berlin)" autocomplete="off" />
    <button id="btn">Anzeigen</button>
    <button id="locBtn" class="secondary" title="Standort verwenden">Mein Standort</button>
  </div>

  <p id="status" class="status"></p>

  <div id="current" class="current"></div>

  <h3 class="forecast-title">Vorhersage (5 Tage)</h3>
  <div id="forecast" class="forecast"></div>

  <p class="hint">
    Open-Meteo nutzt keinen API-Key – ideal für GitHub Pages.
  </p>
</div>

<script src="/assets/js/weather-open-meteo.js"></script>