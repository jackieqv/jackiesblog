---
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

  <h3 class="forecast-title">Vorhersage (nächste Tage)</h3>
  <div id="forecast" class="forecast"></div>

  <p class="hint">
    Hinweis: Auf GitHub Pages ist der API-Key im Code sichtbar. Für Lernprojekte okay – für “produktiv” besser über einen Proxy/Serverless.
  </p>
</div>

<script>
  // Trage hier deinen Key ein:
  window.OPENWEATHER_API_KEY = "6a65e40ffe83a4caa0882cc593128ca0";
</script>
<script src="/assets/js/weather.js"></script>