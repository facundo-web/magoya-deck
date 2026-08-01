# Magoya Knowledge Experience — Roadmap de diseño e identidad

Para revisar entre Facundo, Varu y Pato. Objetivo: que el deck deje de leerse como un template y pase a ser la mejor pieza de diseño e identidad que tiene Magoya — con el texto (ya aprobado, bloqueado) llevando el peso que merece, y elementos/ilustraciones/iconos resaltando los focos en vez de competir con ellos.

## Dónde estamos

**Fase 0 — Base técnica (✅ hecho, live en [facundo-web.github.io/magoya-deck](https://facundo-web.github.io/magoya-deck/)):**
Reconstrucción del artefacto de Claude de Varu como código real (sin build, vanilla), responsive de verdad, deploy + export a PDF.

**Fase 1 — Primera pasada visual (✅ hecho, live):**
Salida del look "Matrix" (negro + verde neón + monospace) hacia el sistema "editorial paper" ya documentado en `brand-system/`. Ritmo papel/tinta redefinido dos veces en esta sesión, terminó así: **tinta solo en 3 momentos de impacto** (Logo, Finale, Discovery) — el resto (11 de 14 escenas) **pasó a papel**, resolviendo el "verde sobre verde" que Varu marcó en los screenshots del board.

**Fase 2 — 7 decisiones cerradas del handoff de diseño (✅ hecho, live):**
Set de íconos normalizado, fondo ambiente reducido, Proof hub rediseñado ("Plano de lote"), sistema de flourishes a silueta rellena, anillo de cantidad en Results, transición con destello papel↔tinta, carátula de PDF con logo de cliente. Detalle en [`DESIGN-BRIEFS.md`](DESIGN-BRIEFS.md).

## Los 4 elementos que estaban abiertos (✅ implementados, live — pendiente de mirada de Varu/Pato)

El handoff de diseño había dejado **4 elementos con 6 direcciones cada uno, ninguna elegida**. Para esta fase armé **exploraciones reales** (2 direcciones por elemento, código funcionando, no solo texto) + revisión adversarial comparando ambas con screenshots reales — y ya implementé la dirección ganadora de cada una en el deck real. Quedan **live, pero a confirmar por ustedes tres** — si alguna no cierra, se ajusta o se revierte sin drama.

| # | Elemento | Qué se implementó | Por qué esa y no la otra |
|---|---|---|---|
| 5 | **Diagramas de los 3 Pilares** (escenas 4-6) | Una sola gramática de diagrama (conectores punteados + nodos con dot) reutilizada en los tres, tomada del propio Proof hub — así el tríptico "ensaya" la escena 7 en vez de competir con ella | La alternativa (un marco compartido sobre los 3 dispositivos originales) no resolvía el problema real — seguían siendo 3 lenguajes distintos, solo con un borde común |
| 6 | **Lenguaje de cards** (Method/Capabilities/Results) | Textura de grano fino + esquinas asimétricas "cortadas a mano" + sombra cálida despareja | La alternativa (card con borde, sin sombra, rotación sutil) no se notaba a tamaño real — quedaba una caja plana, más "wireframe sin terminar" que "elegida a propósito" |
| 7 | **Portada en vivo** (escena 0) | La única línea de copy bloqueada, a escala grande, revelada palabra por palabra | La alternativa (motivo ambiente) tenía un bug real de contraste — el texto quedaba casi invisible en la captura final, no era una cuestión de gusto |
| 10 | **Affordance del hub** | Una marca de esquina persistente (mismo trazo de 1.6px que los íconos), visible siempre, no solo al hacer hover | La alternativa (borde punteado) se lee como "placeholder / sin terminar" — y como el deck también se exporta a PDF estático, esa sería la única versión que un cliente vería, para siempre |

Detalle técnico completo de qué se construyó y qué se descartó, en el historial de commits del repo.

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

Los 4 elementos ya están live en [facundo-web.github.io/magoya-deck](https://facundo-web.github.io/magoya-deck/). Falta que Varu y Pato lo miren y digan si alguno no cierra — y cerrar los 5 conflictos de marca de arriba, que son decisiones de negocio/contenido, no de diseño.
