# Deploy a Cloudflare Pages — paso a paso

## 0. Antes de empezar

Necesitas:
- **Una cuenta de GitHub** (gratis)
- **Una cuenta de Cloudflare** (gratis) — https://dash.cloudflare.com/sign-up
- **Git** instalado localmente (ya lo tienes, lo usaste para el commit)
- **Opcional**: el dominio `satpcgo.es` ya delegado a Cloudflare (si no, Cloudflare te da un `*.pages.dev` gratis)

---

## 1. Crear el repo en GitHub

1. Ve a https://github.com/new
2. **Repository name**: `pcgo`
3. **Visibility**: Public (recomendado) o Private, lo que prefieras
4. **Importante**: NO marques "Add a README file", "Add .gitignore" ni "Choose a license". El proyecto ya tiene todo eso.
5. Click **"Create repository"**
6. GitHub te mostrará la URL del repo. Cópiala — tiene esta pinta:
   ```
   https://github.com/TU_USUARIO/pcgo.git
   ```

---

## 2. Subir el código desde tu máquina

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd C:\Users\puchu\.mavis\workspace\satpcgo-rebuild

# Añade el remote (sustituye TU_USUARIO por tu usuario real de GitHub)
git remote add origin https://github.com/TU_USUARIO/pcgo.git

# Asegúrate de que la rama principal se llame "main"
git branch -M main

# Sube el código
git push -u origin main
```

### Si te pide credenciales:

GitHub ya no acepta contraseñas para `git push`. Tienes dos opciones:

#### Opción A: Personal Access Token (PAT) — recomendada

1. Ve a https://github.com/settings/tokens/new
2. **Note**: "PCGO deploy desde local"
3. **Expiration**: 90 días (o lo que prefieras)
4. **Scopes**: marca solo `repo` (es lo mínimo para push)
5. Click **"Generate token"** y **cópialo** (solo lo verás una vez)
6. Cuando `git push` te pida usuario y contraseña:
   - **Username**: tu usuario de GitHub
   - **Password**: pega el PAT (no tu contraseña real)

#### Opción B: GitHub CLI (`gh`)

Si tienes `gh` instalado y authed:

```powershell
gh auth login
git push -u origin main
```

---

## 3. Conectar Cloudflare Pages al repo

1. Ve a https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Autoriza a Cloudflare a acceder a tu GitHub (la primera vez te pide OAuth)
3. Selecciona el repo **`TU_USUARIO/pcgo`**
4. Click **"Begin setup"**

### Build configuration (CRÍTICO — copiar tal cual)

| Campo | Valor |
|---|---|
| **Project name** | `pcgo` (o el que quieras, generará `pcgo.pages.dev`) |
| **Production branch** | `main` |
| **Framework preset** | Astro |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** *(opcional)* | déjalo vacío |
| **Environment variables** | ninguna |

5. Click **"Save and Deploy"**
6. Cloudflare clona el repo, ejecuta `npm install` + `npm run build`, y publica el `dist/`. Tarda 1-3 minutos la primera vez.
7. Te dará una URL del tipo `https://pcgo.pages.dev` — **ábrela y verifica que se ve bien**.

---

## 4. Dominio custom `satpcgo.es` (cuando estés listo)

Si tu dominio ya está en Cloudflare:

1. En el proyecto de Pages, ve a **Custom domains** → **Set up a custom domain**
2. Escribe `satpcgo.es` → Cloudflare configura DNS automáticamente
3. Repite con `www.satpcgo.es`
4. Espera unos minutos a que el certificado SSL se emita (~2 min)
5. **Importante**: añade redirects en `_redirects` (ya está en el repo) para que `www.satpcgo.es → satpcgo.es`

Si tu dominio NO está en Cloudflare:

1. Transfiérelo o añádelo desde Cloudflare Dashboard → **Add a site**
2. Cloudflare te dará nameservers
3. Cambia los nameservers en tu registrador (GoDaddy, Namecheap, etc.)
4. Espera 24-48h a que propague
5. Vuelve al paso "Si tu dominio ya está en Cloudflare"

---

## 5. Post-deploy OBLIGATORIO

Estos 3 ajustes son críticos para SEO y rendimiento. Sin ellos, el sitio se ve pero pierde posiciones y rendimiento.

### 5.1 Desactivar Cloudflare Managed Robots.txt

Cloudflare por defecto inyecta un robots.txt que **bloquea todos los LLMs** (GPTBot, ClaudeBot, Google-Extended, etc.). Si no lo desactivas, **estás bloqueando ChatGPT, Claude, Perplexity, Google SGE y otros AI de leer tu web** — justo lo contrario de lo que queremos para el GEO.

- Pages → tu proyecto → **Settings** → **Build** → desmarca **"Cloudflare Managed Robots.txt"**

### 5.2 Desactivar Email Obfuscation

- En el menú lateral de Cloudflare: **Speed** → **Optimization** → **Email Obfuscation** → **OFF**

(Ya ofuscamos el email en el HTML con entidades, no necesitamos la inyección extra de Cloudflare.)

### 5.3 Verificar headers de cache (opcional pero recomendado)

- Pages → tu proyecto → **Settings** → **Functions** → **Compatibility flags**
- Si quieres max-age largo en `global.css`, añade un `_headers` file (ya está en el repo):
  ```
  /global.css
    Cache-Control: public, max-age=31536000, immutable
  ```

---

## 6. Verificación final post-deploy

Después del primer deploy, comprueba:

- [ ] `https://pcgo.pages.dev/` se ve bien (home con gradiente azul, hero, cards)
- [ ] `https://pcgo.pages.dev/tarifas` muestra las 3 cards de precios y la tabla PackGo!
- [ ] `https://pcgo.pages.dev/sitemap-index.xml` responde 200
- [ ] `https://pcgo.pages.dev/global.css` responde 200 (el CSS carga)
- [ ] `https://pcgo.pages.dev/robots.txt` muestra tu robots.txt (no el de Cloudflare)
- [ ] View source: ¿está el JSON-LD de LocalBusiness en el head? (`<script type="application/ld+json">`)
- [ ] Google Search Console → añadir la propiedad y verificar con DNS TXT
- [ ] Google Search Console → submit sitemap `https://satpcgo.es/sitemap-index.xml`
- [ ] PageSpeed Insights: https://pagespeed.web.dev/

---

## 7. Workflow continuo

Después del primer deploy, cada vez que hagas cambios:

```powershell
cd C:\Users\puchu\.mavis\workspace\satpcgo-rebuild
# (haz tus cambios)

git add .
git commit -m "Descripción del cambio"
git push
```

Cloudflare detecta el push, ejecuta el build y publica automáticamente en ~30s.

---

## Si algo falla

| Error | Solución |
|---|---|
| `npm install` falla en Cloudflare | Probablemente Node version. En Settings → Build → Variables → añade `NODE_VERSION=22` |
| Build OK pero el sitio sale en blanco | Abre DevTools → Network. ¿Carga `/global.css`? Si 404, revisa que el archivo esté en `public/` |
| 404 en `/servicios/apple` | Cloudflare Pages redirige `/X` → `/X/` con 308. Espera unos segundos o fuerza la barra |
| robots.txt no es el mío | Apartado 5.1 de esta guía |
| CSS no se aplica | Verifica que `dist/global.css` existe y que el HTML tiene `<link rel="stylesheet" href="/global.css">` |
| Email aparece como `[email protected]` | Apartado 5.2 de esta guía |

---

**Más info**:
- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Astro + Cloudflare: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- GitHub PAT: https://github.com/settings/tokens
