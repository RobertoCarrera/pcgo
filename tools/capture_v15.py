"""Capture v15: tall heros + new nav with sliding indicator + mobile menu.

Captures:
  - Desktop: all heros + a hover state on a nav link (shows the sliding indicator)
  - Mobile (375x812): home hero + nav + the mobile menu open state
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v15")
SHOTS.mkdir(exist_ok=True)
BASE = "http://localhost:14322"
DESKTOP = (1440, 900)
MOBILE = (390, 844)

PAGES = [
    ("",                            "v15-home-hero.png",        (0, 0, 1440, 900)),
    ("/quienes-somos",              "v15-quienes-hero.png",    (0, 0, 1440, 900)),
    ("/tarifas",                    "v15-tarifas-hero.png",     (0, 0, 1440, 900)),
    ("/servicios",                  "v15-servicios-hero.png",   (0, 0, 1440, 900)),
    ("/zonas/vilanova-i-la-geltru", "v15-zona-hero.png",        (0, 0, 1440, 900)),
]

with sync_playwright() as p:
    browser = p.chromium.launch()

    # ---- Desktop ----
    ctx = browser.new_context(viewport={"width": DESKTOP[0], "height": DESKTOP[1]}, device_scale_factor=1)
    page = ctx.new_page()
    for url, out, clip in PAGES:
        page.goto(BASE + url, wait_until="networkidle", timeout=20000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(900)
        page.screenshot(path=str(SHOTS / out), clip={"x": clip[0], "y": clip[1], "width": clip[2], "height": clip[3]})
        print(f"  [OK desktop] {out}")

    # ---- Desktop: nav hover state (shows the sliding indicator on a non-active link) ----
    page.goto(BASE + "/quienes-somos", wait_until="networkidle", timeout=20000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(600)
    # Hover the "Tarifas" link so the indicator slides off "Quiénes somos" and onto "Tarifas"
    page.hover('.nav__link[href="/tarifas"]')
    page.wait_for_timeout(700)  # let the slide animation finish
    page.screenshot(path=str(SHOTS / "v15-nav-hover.png"),
                    clip={"x": 0, "y": 0, "width": 1440, "height": 80})
    print(f"  [OK desktop] v15-nav-hover.png")

    # ---- Mobile: home hero with new tall sizing ----
    ctx2 = browser.new_context(viewport={"width": MOBILE[0], "height": MOBILE[1]}, device_scale_factor=2)
    page2 = ctx2.new_page()
    page2.goto(BASE + "", wait_until="networkidle", timeout=20000)
    page2.evaluate("document.fonts.ready")
    page2.wait_for_timeout(900)
    page2.screenshot(path=str(SHOTS / "v15-mobile-home.png"),
                     clip={"x": 0, "y": 0, "width": MOBILE[0], "height": MOBILE[1]})
    print(f"  [OK mobile] v15-mobile-home.png")

    # ---- Mobile: nav open state (full-screen menu with stagger reveal) ----
    page2.goto(BASE + "", wait_until="networkidle", timeout=20000)
    page2.evaluate("document.fonts.ready")
    page2.wait_for_timeout(600)
    page2.click('.nav__toggle')
    page2.wait_for_timeout(900)  # let the stagger animations finish
    page2.screenshot(path=str(SHOTS / "v15-mobile-menu-open.png"),
                     clip={"x": 0, "y": 0, "width": MOBILE[0], "height": MOBILE[1]})
    print(f"  [OK mobile] v15-mobile-menu-open.png")

    page.close(); ctx.close(); page2.close(); ctx2.close(); browser.close()

print(f"\nDone: {SHOTS}")
