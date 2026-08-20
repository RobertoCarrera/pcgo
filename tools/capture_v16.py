"""Capture v16: servicios page with new bento cards + blurred backgrounds."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v16")
SHOTS.mkdir(exist_ok=True)
BASE = "http://localhost:14323"

PAGES = [
    ("/servicios", "v16-servicios-cards.png",  None, True),   # full page
    ("/servicios", "v16-servicios-top.png",    (0, 0, 1440, 900), False),
    ("",          "v16-home-bento.png",       None, True),    # full page
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    for entry in PAGES:
        url, out, clip, full_page = entry
        page.goto(BASE + url, wait_until="networkidle", timeout=20000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(2500)  # let images load
        if full_page:
            page.screenshot(path=str(SHOTS / out), full_page=True)
        else:
            page.screenshot(path=str(SHOTS / out), clip={"x": clip[0], "y": clip[1], "width": clip[2], "height": clip[3]})
        print(f"  [OK] {out}")
    page.close(); ctx.close(); browser.close()
print(f"\nDone: {SHOTS}")
