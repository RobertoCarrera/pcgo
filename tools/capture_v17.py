"""Capture v17: full-clickable bento card + new images."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v17")
SHOTS.mkdir(exist_ok=True)
BASE = "http://localhost:14321"

PAGES = [
    ("/servicios", "v17-servicios-cards.png", None, True,  None),
    ("",          "v17-home-bento.png",       None, True,  None),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    for entry in PAGES:
        url = entry[0]
        out = entry[1]
        clip = entry[2]
        full_page = entry[3]
        action = entry[4] if len(entry) > 4 else None
        page.goto(BASE + url, wait_until="networkidle", timeout=20000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(2500)
        if action == "hover":
            # Hover the first bento card to show the reveal
            page.hover('.bento-card')
            page.wait_for_timeout(500)
        if action == "click":
            # Move mouse to the title area (not the CTA) to show that the whole card is clickable
            page.mouse.move(400, 1100)  # somewhere in the middle of a card
            page.wait_for_timeout(300)
        if full_page:
            page.screenshot(path=str(SHOTS / out), full_page=True)
        else:
            page.screenshot(path=str(SHOTS / out), clip={"x": clip[0], "y": clip[1], "width": clip[2], "height": clip[3]})
        print(f"  [OK] {out}")
    page.close(); ctx.close(); browser.close()
print(f"\nDone: {SHOTS}")
