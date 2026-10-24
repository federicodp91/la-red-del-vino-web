<div align="center">

<img src="assets/img/primer-logo.png" alt="La Red del Vino" width="120">

# 🍷 La Red del Vino

**Vinos boutique de Mendoza, directo de bodegas familiares a tu mesa.**

[**Ver el sitio online →**](https://federicodp91.github.io/la-red-del-vino-web/)

</div>

---

## Sobre el proyecto

La Red del Vino es una red de emprendedores independientes que distribuye vinos familiares y artesanales de bodegas boutique de Mendoza, en series limitadas y sin código de barras. Este sitio presenta la marca, el catálogo y la propuesta de franquicia.

## Características

- 🎬 **Portada con video** de fondo y texto distribuido para que ambos se lean bien.
- 🍇 **Catálogo** de 6 vinos con precios en pesos argentinos.
- 🛒 **Carrito de compras** en un panel lateral, que recuerda tu pedido aunque cierres la página.
- 💬 **Pedidos y contacto por WhatsApp**: el carrito y el formulario abren un mensaje ya armado.
- 🤝 **Sección de franquicia** con requisitos y datos para sumarse como representante.
- 🔞 **Aviso de mayoría de edad** al entrar.
- 📱 **Diseño responsive**, pensado primero para el celular.
- ♿ Navegación con teclado, `aria-labels` y respeto por `prefers-reduced-motion`.

## Tecnologías

HTML5, CSS3 y JavaScript puro. Sin frameworks ni paso de compilación, así que funciona en cualquier hosting estático.

- Tipografías: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) e [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts).
- Publicado con **GitHub Pages**.

## Estructura

```
├── index.html      # Contenido de la página
├── styles.css      # Estilos y diseño responsive
├── app.js          # Catálogo, carrito, formulario y menú
└── assets/
    ├── hero.mp4    # Video de portada
    ├── img/        # Fotos, logos y vinos del catálogo
    └── iconos/     # Íconos
```

## Cómo correrlo en tu computadora

No hace falta instalar nada. Con Python instalado, desde esta carpeta:

```bash
python -m http.server 5173
```

Y abrí <http://localhost:5173>.

## Personalizar

| Qué cambiar | Dónde |
|---|---|
| Vinos y precios | `PRODUCTS` al comienzo de `app.js` |
| Número de WhatsApp | `WHATSAPP` en `app.js` (formato `549` + código de área + número) |
| Colores | variables `:root` al comienzo de `styles.css` |
| Textos | `index.html` |

## Pendiente

- El formulario de contacto abre WhatsApp; para recibir mails reales haría falta un servicio como Formspree o un backend.
- Pago online (por ahora el pedido se coordina por WhatsApp).

---

<div align="center">

© 2022 La Red del Vino® · Prohibida la venta de alcohol a menores de 18 años. Beber con moderación.

</div>
