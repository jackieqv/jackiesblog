---
title: Drinks
permalink: /recipes/drinks/
layout: single
author_profile: true
classes: wide
---

Coffee, tea, smoothies, and other drinks.

{% include recipes-sidebar.html %}

## Posts in Drinks

{% assign drinks_posts = site.categories.drinks %}
{% if drinks_posts and drinks_posts.size > 0 %}
  <ul>
  {% for post in drinks_posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>— {{ post.date | date: "%-d %B %Y" }}</small></li>
  {% endfor %}
  </ul>
{% else %}
No drinks posts yet.
{% endif %}
