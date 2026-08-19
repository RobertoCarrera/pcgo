"""Capture v3 of the home (Apple-level redesign)."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v4")
SHOTS.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:8769"

PAGES = [
    ("home", "/"),
    ("tarifas", "/tarifas/"),
    ("servicio-apple", "/servicios/soporte-apple/"),
    ("zona-vilanova", "/zonas/vilanova-i-la-geltru/"),
]

def force_reveal(page):
    page.add_style_tag(content="""
        .reveal, .reveal--scale { opacity: 1 !important; transform: none !important; }
        .faq__a { grid-template-rows: 1fr !important; }
    """)
    # Trigger counters (set them to final value so they show)
    page.evaluate("""
        document.querySelectorAll('[data-count]').forEach(el => {
            const v = el.dataset.count || '0';
            el.textContent = (el.dataset.prefix || '') + v + (el.dataset.suffix || '');
        });
    """)
    page.wait_for_timeout(400)

with sync_playwright() as p:
    browser = p.chromium.launch()
    desktop = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    for name, path in PAGES:
        page = desktop.new_page()
        page.goto(BASE + path, wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(500)
        force_reveal(page)
        page.wait_for_timeout(300)
        page.screenshot(path=str(SHOTS / f"v4-desktop-{name}.png"), full_page=True)
        print(f"  [OK] v4-desktop-{name}.png")
        page.close()
    desktop.close()
    browser.close()
print(f"\nDone: {SHOTS}")
