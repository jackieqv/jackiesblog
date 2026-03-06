import feedparser
import json
import os
from email.utils import parsedate_to_datetime

feeds = {

    "Education": [
        "https://thedecisionlab.com/feed/",
        "https://coffeeandjunk.substack.com/feed",
        "https://feeds.feedburner.com/bigthink/main"
    ],
    
    "Technology": [
       "https://community.sap.com/khhcw49343/rss/board?board.id=hcm-blog-members",
        "https://community.sap.com/khhcw49343/rss/board?board.id=hcm-blog-sap"
    ],

    "Science": [
        "https://singularityhub.com/feed/",
        "http://www.quantamagazine.org/feed/"
    ],

    "News": [
        "https://www.tagesschau.de/xml/rss2/",
        "https://rss.dw.com/xml/rss-de-top",
    ],

    "Food": [
        "https://www.zuckerzimtundliebe.de",
        "https://kochkarussell.com"
    ]
}

MAX_ITEMS_PER_FEED = 5
MAX_ITEMS_PER_CATEGORY = 5


from datetime import datetime

def parse_date(entry):
    published = entry.get("published", "") or entry.get("updated", "")
    if not published:
        return "", ""

    try:
        dt = parsedate_to_datetime(published)
        display_date = dt.strftime("%d %b %Y")
        return display_date, dt.isoformat()
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
