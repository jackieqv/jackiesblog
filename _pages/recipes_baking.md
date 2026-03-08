---
title: Baking
permalink: /recipes/baking/
layout: single
author_profile: true
classes: wide
---

Cakes, cookies, breads, and sweet bakes.

{% include recipes-sidebar.html %}

## Posts in Baking

{% assign baking_posts = site.categories.baking %}
{% if baking_posts and baking_posts.size > 0 %}
  <ul>
  {% for post in baking_posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>— {{ post.date | date: "%-d %B %Y" }}</small></li>
  {% endfor %}
  </ul>
{% else %}
No baking posts yet.
{% endif %}
