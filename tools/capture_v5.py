"""Capture v5 with liquid glass effect visible."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v5")
SHOTS.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:8770"

def force_reveal(page):
    page.add_style_tag(content="""
        .reveal, .reveal--scale { opacity: 1 !important; transform: none !important; }
        .faq__a { grid-template-rows: 1fr !important; }
        .hero-floating { transform: translateY(-50%) translateY(0) !important; animation: none !important; }
    """)
    page.evaluate("""
        document.querySelectorAll('[data-count]').forEach(el => {
            const v = el.dataset.count || '0';
            el.textContent = (el.dataset.prefix || '') + v + (el.dataset.suffix || '');
        });
    """)
    page.wait_for_timeout(500)

with sync_playwright() as p:
    browser = p.chromium.launch()
    desktop = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = desktop.new_page()
    page.goto(BASE + "/", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(800)
    force_reveal(page)
    # Full page
    page.screenshot(path=str(SHOTS / "v5-desktop-home-full.png"), full_page=True)
    print("  [OK] v5-desktop-home-full.png")
    # Just the hero (to see the floating card)
    page.screenshot(path=str(SHOTS / "v5-desktop-home-hero.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    print("  [OK] v5-desktop-home-hero.png")
    # Just the spotlight (to see the glass card)
    page.evaluate("document.querySelector('.spotlight-bg').scrollIntoView()")
    page.wait_for_timeout(500)
    page.screenshot(path=str(SHOTS / "v5-desktop-home-spotlight.png"), clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    print("  [OK] v5-desktop-home-spotlight.png")
    page.close()
    desktop.close()
    browser.close()
print(f"\nDone: {SHOTS}")
