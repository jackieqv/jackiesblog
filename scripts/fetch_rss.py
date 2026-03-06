import feedparser
import json
import os

feeds = {
    "KI / Artificial Intelligence": [
        "https://openai.com/blog/rss.xml",
        "https://huggingface.co/blog/feed.xml",
        "https://ai.googleblog.com/feeds/posts/default"
    ],

    "Digitale Trends & Technologie": [
        "https://www.theverge.com/rss/index.xml",
        "https://feeds.arstechnica.com/arstechnica/index",
        "https://techcrunch.com/feed/",
        "https://hnrss.org/frontpage"
    ],

    "China & Geopolitik": [
        "https://www.scmp.com/rss/91/feed",
        "https://chinadigitaltimes.net/china/feed/",
        "https://thediplomat.com/feed/"
    ],

    "Nachrichten Deutschland & Welt": [
        "https://www.tagesschau.de/xml/rss2/",
        "https://rss.dw.com/xml/rss-de-top",
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    ],

    "Kochen & Food": [
        "https://feeds.bbci.co.uk/food/rss.xml",
        "https://www.seriouseats.com/rss",
        "https://sallysbakingaddiction.com/feed/"
    ]
}

result = {}

for category, urls in feeds.items():
    result[category] = []

    for url in urls:
        parsed = feedparser.parse(url)

        for entry in parsed.entries[:5]:
            result[category].append({
                "title": entry.get("title"),
                "link": entry.get("link"),
                "published": entry.get("published", ""),
                "source": parsed.feed.get("title", url)
            })

os.makedirs("_data", exist_ok=True)

with open("_data/news.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
