import feedparser
import json
import os

feeds = {
    "Hacker News": "https://hnrss.org/frontpage",
    "The Verge": "https://www.theverge.com/rss/index.xml",
    "NYTimes Tech": "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
}

result = {}

for name, url in feeds.items():
    parsed = feedparser.parse(url)

    items = []
    for entry in parsed.entries[:5]:
        items.append({
            "title": entry.get("title"),
            "link": entry.get("link"),
            "published": entry.get("published", "")
        })

    result[name] = items

os.makedirs("_data", exist_ok=True)

with open("_data/news.json", "w") as f:
    json.dump(result, f, indent=2)
