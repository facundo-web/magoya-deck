# Photography

Dos lugares en el deck están preparados para recibir fotografía real, ninguno tiene imagen todavía:

- **Escena 0 (Intro)** — el cold open.
- **Escena 13 (Discovery)** — el cierre, la llamada a acción.

Se eligieron estas dos y no otras porque son las únicas escenas sin diagrama/ícono/dato propio — en el resto (Pilares, Proof, Method, Capabilities, Results) una foto de fondo competiría con lo que ya está construido ahí.

## Cómo se aplica

Full-bleed, con blur + un velo (scrim) encima para que el copy bloqueado siga siendo legible sin importar qué muestre la foto. El velo ya usa los mismos tokens de color de la escena (verde tinta o crema papel, según corresponda) — no hay colores nuevos.

**Para activar una vez que tengas el archivo:** en `index.html`, buscá el comentario "Photography slot" en la escena 0 o 13, y agregale al `<div class="mg-photo-bg">` un `style="background-image:url('assets/photos/TU-ARCHIVO.jpg')"`. Nada más — el blur, el velo y el z-index ya están resueltos en `css/deck.css`.

Ejemplo:
```html
<div class="mg-photo-bg" style="background-image:url('assets/photos/campo-01.jpg')"></div>
```

## Criterio (pendiente de confirmar con las fotos reales)

- Abstracto o detalle técnico — nunca una escena completa/literal.
- Sin personas.
- Temperatura fría, con verde presente.

No se completa esta carpeta con stock elegido a criterio del implementador — solo con lo que pases vos.
