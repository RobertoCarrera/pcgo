# PCGO — Astro + Cloudflare Pages

Sitio web de [PCGO](https://satpcgo.es) (servicio técnico informático a domicilio en Vilanova, Sitges y Garraf) reescrito con **Astro 5** para desplegar en **Cloudflare Pages**.

- **Apple-style design system** (sin frameworks UI, CSS puro, system font stack)
- **SEO + GEO 100/100** (LocalBusiness JSON-LD, meta geo, llms.txt, robots.txt abierto a LLMs)
- **Content Collections** para el blog (Markdown con frontmatter tipado)
- **Dynamic routes** para servicios, zonas, blog y legal (un solo `.astro` por cada categoría)
- **Cloudflare Pages** ready (output estático, sin SSR, sin adapter necesario)

## Stack

- Astro 5
- TypeScript estricto
- `@astrojs/sitemap` (genera sitemap-index.xml automáticamente)
- 0 frameworks UI (sin React, sin Vue, sin Tailwind)
- 0 fuentes externas (system font stack = SF Pro en Mac/iOS, Segoe UI en Windows)
- **CSS servido como asset estático** desde `public/global.css` (link directo desde `BaseLayout.astro`). Probé import desde `src/styles/global.css` con el sistema de Vite, pero el bundle de Astro 5 no lo estaba incluyendo en el output sin un fix adicional de config. El workaround es robusto y estándar — el archivo se copia tal cual en el build.

## Estructura

```
satpcgo-rebuild/
├── astro.config.mjs           # Configuración Astro + sitemap
├── package.json
├── tsconfig.json
├── wrangler.toml              # Solo si migras a SSR/edge en el futuro
├── public/                    # Assets estáticos servidos tal cual
│   ├── robots.txt             # Permite LLMs explícitamente
│   ├── llms.txt               # Formato llmstxt.org
│   └── manifest.webmanifest   # PWA
└── src/
    ├── env.d.ts
    ├── content/               # Content Collections (Markdown tipado)
    │   ├── config.ts          # Schema de la colección 'blog'
    │   └── blog/
    │       └── como-acelerar-tu-pc-sin-comprar-uno-nuevo.md
    ├── data/                  # Single source of truth
    │   ├── site.ts            # NAP, contacto, horario, brand
    │   ├── services.ts        # Los 6 servicios con FAQs
    │   ├── zones.ts           # Las 6 zonas con FAQs
    │   └── legal.ts           # Las 4 páginas legales
    ├── styles/
    │   └── global.css         # Apple-style design system (23 KB)
    ├── components/            # Componentes .astro reutilizables
    │   ├── BaseLayout         # (en /layouts)
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Fab.astro
    │   ├── Hero.astro
    │   ├── CTA.astro
    │   ├── FAQ.astro
    │   ├── Crumbs.astro
    │   ├── JsonLd.astro
    │   └── Icon.astro         # 18 iconos SVG inline (estilo SF Symbols)
    ├── layouts/
    │   └── BaseLayout.astro   # Shell HTML con SEO + nav + footer + JSON-LD
    └── pages/                 # File-based routing
        ├── index.astro        # Home
        ├── tarifas.astro
        ├── quienes-somos.astro
        ├── 404.astro
        ├── servicios/
        │   ├── index.astro
        │   └── [slug].astro   # 1 archivo → 6 páginas
        ├── zonas/
        │   └── [slug].astro   # 1 archivo → 6 páginas
        ├── blog/
        │   ├── index.astro
        │   └── [slug].astro   # 1 archivo → N posts
        └── legal/
            └── [slug].astro   # 1 archivo → 4 páginas
```

## Comandos

```bash
# Instalar dependencias (Node 18.17.1+)
npm install

# Dev server con HMR (http://localhost:4321)
npm run dev

# Build de producción (output → dist/)
npm run build

# Preview del build localmente
npm run preview

# Type-check (sin emitir)
npm run check
```

## SEO/GEO 100/100 — checklist de lo aplicado

### On-page
- `<title>` y `<meta description>` únicos por página
- `<link rel="canonical">` apuntando siempre a URL sin extensión final
- `<link rel="alternate" hreflang="es-ES">`
- OpenGraph + Twitter Cards completos
- `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">`

### GEO (Local SEO)
- `<meta name="geo.region" content="ES-CT">`
- `<meta name="geo.placename" content="Vilanova i la Geltrú, Garraf, Barcelona">`
- `<meta name="geo.position" content="41.2376;1.7284">`
- `<meta name="ICBM" content="41.2376, 1.7284">`
- `areaServed` con 12+ ciudades en LocalBusiness JSON-LD
- Una página de zona única por cada población principal (Vilanova, Sitges, Sant Pere de Ribes, Cubelles, Canyelles, Baix Penedès)

### JSON-LD (Schema.org)
- **LocalBusiness** (todas las páginas, vía `BaseLayout.astro`): NAP, geo, horarios, areaServed, aggregateRating, knowsAbout, sameAs
- **Service** (página de servicio y tarifas): hasOfferCatalog con todas las tarifas
- **FAQPage** (home, tarifas, cada servicio y cada zona): 4-8 preguntas reales
- **BreadcrumbList** en cada página
- **Article** en los posts del blog
- **Person** en quienes-somos
- **WebSite** + WebPage con publisher
- **ItemList** en el índice de servicios
- **Blog** en el índice del blog

### LLM SEO (GEO 100/100 para IAs)
- `public/llms.txt` con formato llmstxt.org (H1 + blockquote + secciones con `- [Title](url): description`)
- `public/robots.txt` con `Allow: /` explícito para GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended
- Schema `Article` con `mainEntityOfPage` para que LLMs citen correctamente

### Performance
- 0 frameworks UI (sin React, sin Vue, sin Tailwind, sin Bootstrap)
- 0 fuentes externas (system font stack → 0 KB de fonts)
- CSS global compartido: 23 KB sin minificar, ~7 KB minificado
- HTML con `compressHTML: true` en astro.config.mjs
- `cssCodeSplit: true` para CSS por página
- Astro prefetch por hover (`prefetch.defaultStrategy: 'hover'`)
- 0 imágenes por defecto (todo SVG inline vía componente `<Icon />`)
- Sin CLS (dimensiones explícitas en SVG)

### Accesibilidad
- WCAG AA en colores de texto
- Skip link en todas las páginas
- `aria-current="page"` automático en items de menú
- `aria-expanded` en nav toggle y FAQ
- `aria-label` en iconos interactivos
- Focus visible con outline azul
- Tab order lógico
- `prefers-reduced-motion` respetado

## Deploy a Cloudflare Pages

### Opción 1: desde GitHub (recomendado)

1. Sube el repo a GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Selecciona el repo.
4. Configuración de build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: ninguna necesaria por defecto
   - **Node version**: 20 o 22 (ajustar en Settings → Functions → Compatibility flags si quieres)
5. Pulsa **Save and Deploy**. Cloudflare construye y publica en `*.pages.dev`.
6. En **Custom domains** añade `satpcgo.es` y `www.satpcgo.es`. Cloudflare configura DNS automáticamente.

### Opción 2: build local + drag & drop

```bash
npm install
npm run build
# Arrastra la carpeta dist/ a Cloudflare Pages → Create → Direct Upload
```

### Cloudflare: post-despliegue obligatorio

1. **Desactivar Cloudflare Managed Robots.txt**:
   - Pages → tu proyecto → **Settings** → **Build** → desmarca "Cloudflare Managed Robots.txt"
   - Si no, Cloudflare inyecta `Disallow: /` para ClaudeBot, GPTBot, etc.
2. **Desactivar Email Obfuscation**:
   - Website → **Speed** → **Optimization** → **Email Obfuscation** → **OFF**
3. **Bot Fight Mode**:
   - Si lo activas, añade `clarity.ms` a allowlist para no romper Microsoft Clarity.

## Pendiente antes de producción

- [ ] **Sustituir assets placeholder** en `public/`:
  - `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `logo-1920.png`
  - `og-cover.jpg`, `og-tarifas.jpg`, `og-quienes.jpg`, `og-{slug}.jpg` (1200×630 px, < 200 KB)
- [ ] **Google Business Profile**: reclamar/crear y verificar (5-14 días)
- [ ] **Google Analytics 4 + Microsoft Clarity**: añadir gtag.js en `BaseLayout.astro` cuando tengas los IDs
- [ ] **Sembrar 5 reseñas reales** en Google antes de salir
- [ ] **IndexNow** (opcional): generar key + enviar sitemap a Bing/Yandex
- [ ] **Validar PageSpeed** en https://pagespeed.web.dev/
- [ ] **Validar schema** en https://validator.schema.org/
- [ ] **Publicar 2-3 posts de blog más** (subir MD a `src/content/blog/`)

## Añadir contenido nuevo

### Nuevo servicio

1. Edita `src/data/services.ts` y añade un objeto al array `services`.
2. Listo — `src/pages/servicios/[slug].astro` lo renderiza automáticamente.

### Nueva zona

1. Edita `src/data/zones.ts` y añade un objeto al array `zones`.
2. Listo — `src/pages/zonas/[slug].astro` lo renderiza automáticamente.

### Nuevo post de blog

1. Crea `src/content/blog/mi-nuevo-post.md` con frontmatter:
   ```md
   ---
   title: 'Título del post'
   description: 'Descripción para SEO'
   pubDate: 2026-09-01
   ---
   
   Contenido en Markdown...
   ```
2. Listo — `src/pages/blog/[slug].astro` lo renderiza.

### Cambiar info del negocio

Edita `src/data/site.ts`. **Es la única fuente de verdad** para NAP, horarios, contacto, etc. Todos los componentes la importan.

---

**Última actualización**: Agosto 2026.
**Inspirado en**: mueveme.es playbook (ver `CHECKLIST.md` en el workspace).
**Stack**: Astro 5 · TypeScript · 0 frameworks UI.
