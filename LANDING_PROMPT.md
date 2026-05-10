# TkOff Pro — Landing Page Planning Prompt
> Usa este prompt completo para generar la landing page en una sola sesión.

---

## PROMPT COMPLETO

Crea una landing page completa, moderna y futurista de una sola página (`index.html` + `style.css` + `script.js`) para una aplicación de escritorio llamada **TkOff Pro v1.3.0**, usando HTML, CSS y JavaScript puro (sin frameworks).

---

### IDENTIDAD DE MARCA
- Nombre: TkOff Pro
- Versión: v1.3.0
- Creado por: Gino El Arquitecto & Pro Ca-Sa
- Logo: archivo `logo.png` (triángulo azul marino + flecha naranja)
- Colores: Azul primario `#00346f`, Naranja acento `#fd6c00`, Azul medio `#255dad`
- Tipografía: Google Fonts — **Inter** (pesos 400, 600, 700, 900)
- Estilo: Dark mode futurista, glassmorphism, gradientes, partículas o grid animado de fondo

---

### SECCIONES (en orden)

**1. NAVBAR** — Logo izquierda + links de navegación (Features, How It Works, Download) + botón CTA "Download Free" derecha. Sticky con blur al hacer scroll.

**2. HERO** — Título grande impactante: *"The Future of Construction Takeoff"*, subtítulo: *"Open any blueprint PDF, measure with precision, and generate professional estimates in minutes."*, dos botones: "⬇ Download for Windows" + "Download for Mac", badge con "v1.3.0 — Free to Use". Fondo animado (grid de líneas tipo blueprint / partículas). Mockup de la app a la derecha o centrado abajo.

**3. FEATURES (6 tarjetas en grid)** — Con icono SVG, título y descripción corta:
- 📄 PDF Blueprint Viewer — *Abre planos multi-página con zoom suave y navegación instantánea*
- 📐 5 Herramientas de Medición — *Líneas, polígonos, rutas, conteo y cinta métrica sobre el plano*
- 📏 Escalas Profesionales — *Arquitectónicas, de ingeniería y métricas. Calibración manual incluida*
- 🗂️ Sistema de Capas — *Organiza tus medidas por layer con colores, opacidad y altura de muro*
- 💰 Estimating en Tiempo Real — *Tabla de costos viva con calculadora matemática integrada en precios*
- 📊 Export a Excel Profesional — *Reporte jerárquico con formato de moneda, subtotales y Grand Total*

**4. HOW IT WORKS (3 pasos visuales con línea conectora)**
- Paso 1: "Abre tu PDF" — Importa cualquier plano arquitectónico
- Paso 2: "Mide con precisión" — Dibuja áreas, líneas y puntos directamente sobre el plano
- Paso 3: "Exporta tu presupuesto" — Genera un Excel profesional con un solo clic

**5. SHOWCASE DE HERRAMIENTAS** — Fila horizontal de tarjetas pequeñas animadas mostrando cada herramienta con su ícono, nombre y atajo de teclado: Select (Q), Line (L), Path (P), Area (A), Count (C), Scale (S), Tape (T).

**6. ESTIMATING SECTION** — Sección destacada mostrando una tabla simulada del módulo Estimating (HTML/CSS puro, sin imagen). Mostrar filas de ejemplo con colores de fondo por página, sub-layers indentados con `└`, columnas: Description / Wall Height / Qty / Unit / Unit Price / Total Cost. Grand Total resaltado al final. Texto al lado: *"De medición a presupuesto en segundos"*.

**7. DOWNLOAD CTA** — Fondo diferente (oscuro o gradiente). Título: *"¿Listo para trabajar como un profesional?"*, subtítulo con la versión y plataformas. Dos botones grandes: Windows (.exe) y Mac (.dmg). Badge de seguridad: "✓ Free Download · No subscription · No cloud".

**8. ABOUT / CREATOR** — Sección pequeña y elegante: Logo centrado, nombre de la app, "Created by Gino El Arquitecto & Pro Ca-Sa", texto breve de misión.

**9. FOOTER** — Logo pequeño, links (Features, Download), copyright "© 2025 TkOff Pro · Gino El Arquitecto & Pro Ca-Sa", versión.

---

### REQUISITOS TÉCNICOS
- 100% responsive (mobile, tablet, desktop)
- Animaciones suaves: fade-in al hacer scroll (Intersection Observer)
- Hover effects en todas las tarjetas y botones
- Smooth scroll entre secciones
- Navbar cambia de transparente a blur/glass al hacer scroll
- Sin librerías externas excepto Google Fonts
- SEO básico: title, meta description, og:image
- Los botones de descarga pueden apuntar a `#` por ahora (placeholder)
- El archivo del logo es `logo.png` y está en la misma carpeta

---

## ESTRUCTURA DE ARCHIVOS A CREAR
```
website/
├── index.html       ← Página principal
├── style.css        ← Todos los estilos
├── script.js        ← Animaciones e interactividad
├── logo.png         ← Logo (ya existe)
├── APP_NOTES.md     ← Notas de referencia (ya existe)
└── LANDING_PROMPT.md ← Este archivo
```
