# Magoya Knowledge Experience

La versión "código" del artefacto navegable que armó Varu (la que le mostró a Justin). Mismo diseño, misma interacción — pero como archivos reales, no un artefacto de IA: así los logos/imágenes se sirven de verdad y el copy se edita sin tocar el motor.

## Ver / editar

No hay build ni instalación. Es HTML+CSS+JS plano.

```bash
python3 -m http.server 8080
```

Y abrir `http://localhost:8080`.

- **Editar el copy de las escenas** (los 14 momentos: Intro, Manifiesto, Logo, Why Magoya, 3 Pilares, Proof, Finale, Bridge, Method, Capabilities, Results, Discovery): están en `index.html`, cada uno en su `<section class="scene" data-scene="N">`.
- **Editar el contenido de los 5 paneles de exploración** (los 22 dominios agrícolas, 8 personas, 8 etapas, 10 países, 15 tipos de organización que aparecen al clickear un nodo en la escena "Proof"): todo vive en `content/panels.js`, separado del resto — se puede tocar sin riesgo de romper el layout.
- **Logos/assets reales**: `assets/logos/` (wordmark Magoya verde/blanco) y `assets/logos/clients/` (Bayer, BASF, Corteva, John Deere, Syngenta en SVG real, para cuando haga falta personalizar un "Prepared for [Cliente]" en una portada — hoy esta pieza no muestra logos de clientes, solo el propio de Magoya).

## Navegación (para quien lo mira)

Scroll, flechas ← →, o los puntitos de la derecha (agrupan las 14 escenas en 7 secciones). En la escena "Proof" (la del hub con 64 en el centro) cada nodo abre un panel lateral explorable.

## Descargar como PDF

```bash
python3 build_pdf.py
```

Genera `Magoya_Knowledge_Experience.pdf` — 14 páginas, una por escena, con el link de "Book a Discovery Call" clickeable. Requiere Chrome instalado. Regenerar cada vez que cambie el contenido.

Internamente usa `index.html?print=1`: ese modo muestra las 14 escenas apiladas (una por página) en vez de una sola a la vez — así el mismo archivo sirve para la versión navegable online y para el PDF, sin mantener dos copias del copy.

## Pendiente / próximos pasos

- Definir dónde se hostea la versión online (mismo patrón que `magoya-executive-summary` / `john-deere-pilot-proposal`: repo público + GitHub Pages o Vercel) — no se hizo el deploy todavía, falta decidir URL.
- Versión "PPT / slider" más simple (la que se decía en la reunión con Varu que sirve de fallback si el formato navegable no encaja en algún contexto) — se puede armar reusando `content/panels.js` y las escenas lineales de `index.html`, sacando el hub interactivo.
- Momento de revisión antes de que el contenido sea "de verdad" (pedido explícito de Varu en la reunión: como es material de venta, necesita una instancia de validación de contenido antes de salir — no auto-publicar cambios).
