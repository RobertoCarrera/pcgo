"""Capture hero on all key pages — v14, with servicios + zonas + service detail."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v14")
SHOTS.mkdir(exist_ok=True)
BASE = "http://localhost:14324"
PAGES = [
    ("",                                "v14-home-hero.png",          (0, 0, 1440, 900)),
    ("/quienes-somos",                  "v14-quienes-hero.png",      (0, 0, 1440, 900)),
    ("/tarifas",                        "v14-tarifas-hero.png",       (0, 0, 1440, 900)),
    ("/blog",                           "v14-blog-hero.png",          (0, 0, 1440, 900)),
    ("/servicios",                      "v14-servicios-hero.png",     (0, 0, 1440, 900)),
    ("/zonas/vilanova-i-la-geltru",     "v14-zona-hero.png",          (0, 0, 1440, 900)),
    ("/servicios/reparacion-ordenadores", "v14-servicio-detalle-hero.png", (0, 0, 1440, 900)),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    for url, out, clip in PAGES:
        page.goto(BASE + url, wait_until="networkidle", timeout=20000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(900)
        page.screenshot(path=str(SHOTS / out), clip={"x": clip[0], "y": clip[1], "width": clip[2], "height": clip[3]})
        print(f"  [OK] {out}")
    page.close()
    ctx.close()
    browser.close()
print(f"\nDone: {SHOTS}")
