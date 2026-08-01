# Magoya Knowledge Experience — Roadmap de diseño e identidad

Para revisar entre Facundo, Varu y Pato. Objetivo: que el deck deje de leerse como un template y pase a ser la mejor pieza de diseño e identidad que tiene Magoya — con el texto (ya aprobado, bloqueado) llevando el peso que merece, y elementos/ilustraciones/iconos resaltando los focos en vez de competir con ellos.

## Dónde estamos

**Fase 0 — Base técnica (✅ hecho, live en [facundo-web.github.io/magoya-deck](https://facundo-web.github.io/magoya-deck/)):**
Reconstrucción del artefacto de Claude de Varu como código real (sin build, vanilla), responsive de verdad, deploy + export a PDF.

**Fase 1 — Primera pasada visual (✅ hecho, live):**
Salida del look "Matrix" (negro + verde neón + monospace) hacia el sistema "editorial paper" ya documentado en `brand-system/`. Ritmo papel/tinta redefinido dos veces en esta sesión, terminó así: **tinta solo en 3 momentos de impacto** (Logo, Finale, Discovery) — el resto (11 de 14 escenas) **pasó a papel**, resolviendo el "verde sobre verde" que Varu marcó en los screenshots del board.

**Fase 2 — 7 decisiones cerradas del handoff de diseño (✅ hecho, live):**
Set de íconos normalizado, fondo ambiente reducido, Proof hub rediseñado ("Plano de lote"), sistema de flourishes a silueta rellena, anillo de cantidad en Results, transición con destello papel↔tinta, carátula de PDF con logo de cliente. Detalle en [`DESIGN-BRIEFS.md`](DESIGN-BRIEFS.md).

## Lo que falta — y por qué necesita su mirada, no la mía sola

El handoff de diseño dejó **4 elementos con 6 direcciones cada uno, ninguna elegida todavía** — a propósito, porque son las piezas donde el "cómo se ve" define bastante de cómo se *siente* usar el deck, y esa decisión es de ustedes tres, no mía. Para esta fase armé **exploraciones reales** (no solo texto) de cada una, con 3 agentes de diseño independientes por ítem + revisión cruzada, para que tengan algo concreto para mirar y elegir — igual que hicimos con el fondo/responsive al principio de esta sesión.

| # | Elemento | Por qué importa | Estado |
|---|---|---|---|
| 5 | **Diagramas de los 3 Pilares** (escenas 4-6) | Hoy cada pilar improvisa un dispositivo visual distinto (nube de tags / formas morphing / cadena de pills) — deberían leerse como un mismo argumento contado en tres partes | 🔄 en exploración |
| 6 | **Lenguaje de cards/contenedores** | Las cards de Method/Capabilities/Results son rectángulos con sombra genérica — con el fondo ya resuelto a papel, esta es la pieza que más define si el deck "se siente Magoya" o "se siente Bootstrap" | 🔄 en exploración |
| 7 | **Portada en vivo (escena 0)** | Es lo primero que ve un prospecto y hoy es casi vacía — una sola línea de texto | 🔄 en exploración |
| 10 | **Affordance de los nodos del hub** | El momento más interactivo del deck (Proof) no avisa que se puede clickear, sobre todo en mobile/touch | 🔄 en exploración |

*(Corriendo en background mientras arman esto — aviso en cuanto tenga las 4 propuestas con screenshots reales para que las vean los tres.)*

## Conflictos de marca a resolver — no bloquean el deck, pero hay que cerrarlos

1. **Dos verdes conviviendo.** El deck usa `#0F2E1E`/`#00DE68`; el design system de producto de Magoya usa `#0A0E14`/`#13BC64`. Alguien tiene que decidir si conviven o se reconcilian.
2. **`brand-system/styleguide.html` quedó desactualizado.** El deck eliminó JetBrains Mono (decisión del founder, aplicada); el styleguide documentado todavía dice que mono va en eyebrows/captions/datos. Hay que actualizarlo o van a convivir dos sistemas tipográficos documentados.
3. **Dirección de fotografía sin cerrar.** Se habilitó fotografía como material (abstracta/técnica, sin personas, temperatura fría con verde presente) pero no hay ninguna imagen todavía — falta el criterio final antes de elegir la primera.
4. **Logos de clientes faltantes.** La carpeta `assets/logos/clients/` tiene Bayer/BASF/Corteva/JD/Syngenta + el set bajado del sitio (Xarvio/FieldView/GDM/Stine/BCBA/Biome Makers/Indigo). Faltan los archivos reales de **Apeel, Precision Planting, Nera, Nidera** — no se fabrican, hay que conseguirlos.
5. **Panel "Organizations"** (uno de los 5 paneles de exploración del Proof hub) tiene menos contenido que sus 4 hermanos — le faltan los bullets. Esto es contenido, no diseño: **lo tienen que escribir Varu/Pato** (4 bullets de 6-11 palabras por ítem, mismo formato que los otros 4 paneles).

## Perfiles / agentes para esta fase

No es un solo perfil — son roles bien distintos, y así los separé para que cada propuesta venga de la lente correcta:

- **Diseñador de sistemas visuales** (el que ya usamos para íconos/hub/flourishes) — geometría, tokens, consistencia entre piezas.
- **Diseñador editorial/de contenido** — cómo el texto (bloqueado, no se toca) respira en el layout: jerarquía, ritmo de lectura, dónde un elemento gráfico ayuda a que un párrafo dense no se lea como un muro.
- **Diseñador de interacción/motion** — affordances, transiciones, qué se mueve y por qué (ya hay un presupuesto de movimiento definido: una sola cosa animada por escena).
- **Revisor adversarial** — el mismo rol que usamos antes: no propone, refuta. Evita que una propuesta linda pero poco práctica pase sin que alguien la cuestione primero.
- **Implementador** (yo) — traduzco lo que ustedes tres aprueben a código real, vanilla, sin romper nada de lo que ya funciona.

Lo que **no** delegué a un agente: las 5 decisiones de la sección de conflictos de marca arriba. Esas son de negocio/contenido, no de diseño — ahí solo puedo señalarlas.

## Próximo paso concreto

Cuando termine la exploración de los 4 elementos abiertos, les mando el comparativo (como hice con el fondo/responsive) para que Varu y Pato elijan dirección — recién ahí implemento en el deck real, para no repetir el ciclo de "implementar → no les cierra → rehacer".
