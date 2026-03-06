---
title: Tech News
permalink: /news/
layout: single
---

# Tech News

{% assign feeds = site.data.news %}

{% for feed in feeds %}
## {{ feed[0] }}

<ul>
{% for item in feed[1] %}
  <li>
    <a href="{{ item.link }}" target="_blank" rel="noopener noreferrer">
      {{ item.title }}
    </a>
  </li>
{% endfor %}
</ul>
{% endfor %}
