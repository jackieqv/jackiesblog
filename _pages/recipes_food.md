---
title: Food
permalink: /recipes/food/
layout: single
author_profile: true
classes: wide
---

Meals, savory dishes, and everyday cooking.

{% include recipes-sidebar.html %}

## Posts in Food

{% assign food_posts = site.categories.food %}
{% if food_posts and food_posts.size > 0 %}
  <ul>
  {% for post in food_posts %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>— {{ post.date | date: "%-d %B %Y" }}</small></li>
  {% endfor %}
  </ul>
{% else %}
No food posts yet.
{% endif %}
