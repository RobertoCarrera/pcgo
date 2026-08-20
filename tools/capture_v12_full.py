"""Capture full home page after Satoshi rollout."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v12")
BASE = "http://127.0.0.1:14322"

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=20000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(1000)
    page.screenshot(path=str(SHOTS / "v12-home-full.png"), full_page=True)
    print("  [OK] v12-home-full.png")
    ctx.close()
    browser.close()
