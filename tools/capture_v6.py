"""Capture v6: dock in hero + spotlight glass. Move the mouse to the dock center to see magnification."""
from pathlib import Path
from playwright.sync_api import sync_playwright

SHOTS = Path(r"C:\Users\puchu\.mavis\workspace\satpcgo-rebuild\previews-v6")
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
    page.screenshot(path=str(SHOTS / "v6-desktop-home-full.png"), full_page=True)
    print("  [OK] v6-desktop-home-full.png")

    # 2) Hero — no mouse over the dock (resting state)
    page.screenshot(path=str(SHOTS / "v6-desktop-home-hero.png"),
                    clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    print("  [OK] v6-desktop-home-hero.png")

    # 3) Hero — mouse hovering on the middle dock icon (magnified state)
    dock = page.locator(".dock")
    dock.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    # Position the mouse on the second icon (chat / WhatsApp) to show magnification
    box = dock.bounding_box()
    if box:
        # Mouse on the second icon of the dock
        mouse_x = box["x"] + box["width"] * 0.4
        mouse_y = box["y"] + box["height"] / 2
        page.mouse.move(mouse_x, mouse_y)
        page.wait_for_timeout(400)  # let the transition settle
        # Get the dock element box and screenshot a region around it
        page.screenshot(
            path=str(SHOTS / "v6-desktop-home-dock-hover.png"),
            clip={
                "x": max(0, box["x"] - 40),
                "y": max(0, box["y"] - 80),
                "width": min(1440, box["width"] + 80),
                "height": min(900, box["height"] + 160),
            },
        )
        print(f"  [OK] v6-desktop-home-dock-hover.png ({int(box['width'])}x{int(box['height'])})")

    # 4) Spotlight section
    page.mouse.move(0, 0)
    spot = page.locator(".spotlight-bg")
    spot.scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    box = spot.bounding_box()
    if box:
        page.screenshot(
            path=str(SHOTS / "v6-desktop-home-spotlight.png"),
            clip={
                "x": max(0, box["x"]),
                "y": max(0, box["y"]),
                "width": min(1440, box["width"]),
                "height": min(2000, box["height"]),
            },
        )
        print(f"  [OK] v6-desktop-home-spotlight.png ({int(box['width'])}x{int(box['height'])})")

    page.close()
    desktop.close()
    browser.close()
print(f"\nDone: {SHOTS}")
