#!/usr/bin/env python3
"""
Patches events with description (richText), primaryCta, and secondaryCta
from the Webflow CSV export.

Run from gertie/gertie: python3 scripts/patch-event-richtext.py
"""
import csv
import json
import re
import urllib.request
import urllib.error

BASE = 'http://localhost:3000'
CSV_PATH = '/Users/matthewbruinooge/Downloads/EWO-01 - Entries - 66e0c4d4e60abf0047b9a1f3.csv'

SKIP_URLS = {'stoodio-x-earlywork', 'detroit', 'chicago-trip', 'reykjavik',
             'save-the-date-trip-to-guadalajara-and-mexico-city'}
SKIP_NAMES = {"EarlyWork's Newsletter Archive"}

# ── HTML → Lexical JSON ────────────────────────────────────────────────────────

def make_text(text, fmt=0):
    return {'type': 'text', 'text': text, 'format': fmt, 'style': '', 'mode': 'normal', 'detail': 0, 'version': 1}

def make_linebreak():
    return {'type': 'linebreak', 'version': 1}

def make_link(url, children):
    return {
        'type': 'link',
        'version': 2,
        'fields': {'linkType': 'custom', 'url': url, 'newTab': True},
        'children': children,
        'direction': 'ltr',
        'format': '',
        'indent': 0,
        'rel': 'noreferrer',
    }

def make_paragraph(children):
    if not children:
        children = [make_text('')]
    return {
        'type': 'paragraph',
        'version': 1,
        'format': '',
        'indent': 0,
        'direction': 'ltr',
        'children': children,
    }

def parse_inline(tag_str):
    """Parse inline HTML (inside a <p>) into Lexical children."""
    from html.parser import HTMLParser

    children = []
    stack = []  # current format stack: list of ('strong'|'em'|'a', extra)

    class InlineParser(HTMLParser):
        def __init__(self):
            super().__init__()
            self._fmt = 0
            self._link_url = None

        def handle_starttag(self, tag, attrs):
            amap = dict(attrs)
            if tag == 'strong' or tag == 'b':
                self._fmt |= 1
            elif tag == 'em' or tag == 'i':
                self._fmt |= 2
            elif tag == 'a':
                self._link_url = amap.get('href', '')
                stack.append(('a', self._link_url, []))
            elif tag == 'br':
                if stack and stack[-1][0] == 'a':
                    stack[-1][2].append(make_linebreak())
                else:
                    children.append(make_linebreak())

        def handle_endtag(self, tag):
            if tag == 'strong' or tag == 'b':
                self._fmt &= ~1
            elif tag == 'em' or tag == 'i':
                self._fmt &= ~2
            elif tag == 'a':
                if stack and stack[-1][0] == 'a':
                    _, url, link_children = stack.pop()
                    children.append(make_link(url, link_children if link_children else [make_text('')]))

        def handle_data(self, data):
            # Unescape &nbsp; etc
            data = data.replace('\u00a0', ' ')
            if not data:
                return
            node = make_text(data, self._fmt)
            if stack and stack[-1][0] == 'a':
                stack[-1][2].append(node)
            else:
                children.append(node)

        def handle_entityref(self, name):
            mapping = {'nbsp': ' ', 'amp': '&', 'lt': '<', 'gt': '>',
                       'quot': '"', 'apos': "'", 'mdash': '—', 'ndash': '–',
                       'ldquo': '\u201c', 'rdquo': '\u201d', 'lsquo': '\u2018', 'rsquo': '\u2019'}
            self.handle_data(mapping.get(name, ''))

    p = InlineParser()
    p.feed(tag_str)
    return children

def html_to_lexical(html):
    if not html:
        return None
    html = html.strip()
    if not html:
        return None

    # Split on <p ...>...</p> blocks
    # Also handle bare text (no p tags)
    para_pattern = re.compile(r'<p[^>]*>(.*?)</p>', re.DOTALL | re.IGNORECASE)
    paragraphs = []

    matches = list(para_pattern.finditer(html))
    if not matches:
        # No <p> tags — wrap everything in one paragraph
        children = parse_inline(html)
        if children:
            paragraphs.append(make_paragraph(children))
    else:
        for m in matches:
            inner = m.group(1)
            children = parse_inline(inner)
            paragraphs.append(make_paragraph(children))

    if not paragraphs:
        return None

    return {
        'root': {
            'type': 'root',
            'format': '',
            'indent': 0,
            'version': 1,
            'direction': 'ltr',
            'children': paragraphs,
        }
    }

# ── API helpers ────────────────────────────────────────────────────────────────

def api(method, path, data=None, token=None):
    url = BASE + path
    body = json.dumps(data).encode() if data else None
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'JWT {token}'
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return json.loads(e.read())

# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    # Login
    auth = api('POST', '/api/users/login', {
        'email': 'test@bruinooge.net',
        'password': 'vvwDEsWqLeim9onPDi7XCnXz',
    })
    token = auth.get('token')
    print(f'Login: {"OK" if token else "FAILED"}')
    if not token:
        return

    # Load CSV
    with open(CSV_PATH, newline='', encoding='utf-8') as f:
        rows = list(csv.DictReader(f))

    patched = skipped = failed = 0

    for r in rows:
        slug = r['URL'].strip()
        name = r['Name'].strip()

        if slug in SKIP_URLS or name in SKIP_NAMES:
            continue

        description_html = r.get('Description', '').strip()
        cta_label = r.get('Call to Action Button Text', '').strip()
        cta_url = r.get('Call to Action Button Link', '').strip()

        # Skip if nothing to import
        if not description_html and not cta_label:
            skipped += 1
            continue

        # Find event by slug
        found = api('GET', f'/api/events?where[slug][equals]={slug}&limit=1', token=token)
        event = found.get('docs', [None])[0]
        if not event:
            print(f'  NOT FOUND: {slug}')
            skipped += 1
            continue

        event_id = event['id']
        patch = {}

        if description_html:
            lexical = html_to_lexical(description_html)
            if lexical:
                patch['description'] = lexical

        if cta_label and cta_url:
            patch['primaryCta'] = {'label': cta_label, 'url': cta_url}

        if not patch:
            skipped += 1
            continue

        print(f'Patching [{event_id}] {slug}')
        result = api('PATCH', f'/api/events/{event_id}', patch, token=token)
        if result.get('doc') or result.get('id'):
            print(f'  ✓')
            patched += 1
        else:
            print(f'  ✗ {json.dumps(result.get("errors", result))[:200]}')
            failed += 1

    print(f'\nDone — patched: {patched}, skipped: {skipped}, failed: {failed}')

main()
