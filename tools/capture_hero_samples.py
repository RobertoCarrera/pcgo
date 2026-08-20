"""Capture 3 hero samples as PNG. Wait for web fonts to load."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews\hero-samples")
BASE = "http://127.0.0.1:14322"
FILES = [
    ("01-inter.html",  "01-inter.png"),
    ("02-satoshi.html","02-satoshi.png"),
    ("03-geist.html",  "03-geist.png"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()

    for src, out in FILES:
        page.goto(f"{BASE}/{src}", wait_until="networkidle", timeout=20000)
        # Wait for the web fonts to actually load
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(800)
        # Render full viewport (the hero fills 100vh)
        page.screenshot(path=str(OUT / out), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
        print(f"  [OK] {out}")

    ctx.close()
    browser.close()
print(f"\nDone: {OUT}")
