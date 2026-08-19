"""Capture v7: MagicUI bento grid + dock in hero."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v7")
SHOTS.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:8770"

def force_reveal(page):
    page.add_style_tag(content="""
        .reveal, .reveal--scale { opacity: 1 !important; transform: none !important; }
        .faq__a { grid-template-rows: 1fr !important; }
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

    # 1) Full page
    page.mouse.move(0, 0)
    page.screenshot(path=str(SHOTS / "v7-desktop-home-full.png"), full_page=True)
    print("  [OK] v7-desktop-home-full.png")

    # 2) Services bento (resting state)
    bento = page.locator(".bento-grid")
    bento.scroll_into_view_if_needed()
    page.wait_for_timeout(400)
    box = bento.bounding_box()
    if box:
        page.screenshot(
            path=str(SHOTS / "v7-desktop-bento-rest.png"),
            clip={
                "x": max(0, box["x"] - 20),
                "y": max(0, box["y"] - 80),
                "width": min(1440, box["width"] + 40),
                "height": min(2000, box["height"] + 160),
            },
        )
        print(f"  [OK] v7-desktop-bento-rest.png ({int(box['width'])}x{int(box['height'])})")

    # 3) Services bento with hover on Reparación de ordenadores
    cards = bento.locator(".bento-card")
    n = cards.count()
    print(f"  [INFO] {n} bento cards found")
    if n > 0:
        # Hover on the 2nd card (Reparación de ordenadores)
        target = cards.nth(1)
        tbox = target.bounding_box()
        if tbox:
            page.mouse.move(tbox["x"] + tbox["width"] / 2, tbox["y"] + tbox["height"] / 2)
            page.wait_for_timeout(450)
            page.screenshot(
                path=str(SHOTS / "v7-desktop-bento-hover.png"),
                clip={
                    "x": max(0, box["x"] - 20),
                    "y": max(0, box["y"] - 80),
                    "width": min(1440, box["width"] + 40),
                    "height": min(2000, box["height"] + 160),
                },
            )
            print(f"  [OK] v7-desktop-bento-hover.png")

    # 4) Hero
    page.mouse.move(0, 0)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)
    page.screenshot(path=str(SHOTS / "v7-desktop-home-hero.png"),
                    clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    print("  [OK] v7-desktop-home-hero.png")

    page.close()
    desktop.close()
    browser.close()
print(f"\nDone: {SHOTS}")
