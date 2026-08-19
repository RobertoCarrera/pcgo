"""Capture v6: hero with dock visible (resting state)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v6")
SHOTS.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:8770"

with sync_playwright() as p:
    browser = p.chromium.launch()
    desktop = browser.new_context(viewport={"width": 1440, "height": 1100}, device_scale_factor=1)
    page = desktop.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(500)
    page.add_style_tag(content="""
        .reveal, .reveal--scale { opacity: 1 !important; transform: none !important; }
    """)
    page.wait_for_timeout(300)

    # 1) Full hero (resting, no mouse)
    page.mouse.move(0, 0)
    page.screenshot(path=str(SHOTS / "v6-desktop-home-hero-full.png"),
                    clip={"x": 0, "y": 0, "width": 1440, "height": 1100})
    print("  [OK] v6-desktop-home-hero-full.png")

    # 2) Hero with mouse on dock 3rd icon (tag/Tarifas) to show magnification
    dock = page.locator(".dock")
    box = dock.bounding_box()
    if box:
        # Mouse on the 3rd icon (tag) — ~50% across
        page.mouse.move(box["x"] + box["width"] * 0.5, box["y"] + box["height"] / 2)
        page.wait_for_timeout(450)
        page.screenshot(path=str(SHOTS / "v6-desktop-home-hero-full-hover.png"),
                        clip={"x": 0, "y": 0, "width": 1440, "height": 1100})
        print("  [OK] v6-desktop-home-hero-full-hover.png")

    page.close()
    desktop.close()
    browser.close()
print(f"\nDone: {SHOTS}")
