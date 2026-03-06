---
layout: page
published: true
title: Tech News
permalink: /news/
---

# Tech News

{% assign feeds = site.data.news %}

{% for feed in feeds %}
## {{ feed[0] }}

<ul>
{% for item in feed[1] %}
<li>
<a href="{{ item.link }}" target="_blank">
{{ item.title }}
</a>
</li>
{% endfor %}
</ul>

{% endfor %}
