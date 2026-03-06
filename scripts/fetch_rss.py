import feedparser
import json
import os
from email.utils import parsedate_to_datetime

feeds = {

    "Digitale Trends & Technologie": [
        "https://www.theverge.com/rss/index.xml",
        "https://feeds.arstechnica.com/arstechnica/index",
        "https://techcrunch.com/feed/",
        "https://hnrss.org/frontpage",
        "https://stratechery.com/feed/"
    ],

    "KI / Artificial Intelligence": [
        "https://openai.com/news/rss.xml",
        "https://huggingface.co/blog/feed.xml",
        "https://www.technologyreview.com/feed/"
    ],

    "China & Geopolitik": [
        "https://www.scmp.com/rss/91/feed",
        "https://chinadigitaltimes.net/china/feed/",
        "https://thediplomat.com/feed/"
    ],

    "Finanzen & Börse": [
        "https://www.ft.com/markets?format=rss",
        "https://feeds.bloomberg.com/markets/news.rss",
        "https://feeds.marketwatch.com/marketwatch/topstories/",
        "https://www.handelsblatt.com/contentexport/feed/finanzen"
    ],

    "Nachrichten Deutschland & Welt": [
        "https://www.tagesschau.de/xml/rss2/",
        "https://rss.dw.com/xml/rss-de-top",
        "https://feeds.bbci.co.uk/news/world/rss.xml",
        "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    ],

    "Kochen & Food": [
        "https://www.chefkoch.de/rs/s0/neuerezepte.xml",
        "https://www.essen-und-trinken.de/feed",
        "https://www.lecker.de/rss.xml"
    ]
}

MAX_ITEMS_PER_FEED = 6
MAX_ITEMS_PER_CATEGORY = 18


def parse_date(entry):
    published = entry.get("published", "") or entry.get("updated", "")
    if not published:
        return "", ""
    try:
        dt = parsedate_to_datetime(published)
        return published, dt.isoformat()
    except Exception:
        return published, published


result = {}

for category, urls in feeds.items():
    result[category] = []

    for url in urls:
        parsed = feedparser.parse(url)
        source_name = parsed.feed.get("title", url)

        for entry in parsed.entries[:MAX_ITEMS_PER_FEED]:
            published_raw, sort_date = parse_date(entry)

            result[category].append({
                "title": entry.get("title", "Ohne Titel"),
                "link": entry.get("link", "#"),
                "published": published_raw,
                "source": source_name,
                "sort_date": sort_date
            })

    result[category] = sorted(
        result[category],
        key=lambda item: item.get("sort_date", ""),
        reverse=True
    )[:MAX_ITEMS_PER_CATEGORY]

os.makedirs("_data", exist_ok=True)

with open("_data/news.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)
