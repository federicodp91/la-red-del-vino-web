"use strict";

const WHATSAPP = "5491124500868";
const IMG = "assets/img/catalogo/";

const PRODUCTS = [
  { id: "encuentro-malbec", name: "Encuentro Malbec", tag: "Malbec · 750 ml", price: 3400, img: "Encuentro-Malbec.webp" },
  { id: "trumpeter-malbec", name: "Trumpeter Malbec", tag: "Malbec · 750 ml", price: 2450, img: "trumpeter-malbec.webp" },
  { id: "trumpeter-cabernet-franc", name: "Trumpeter Cabernet Franc", tag: "Cabernet Franc · 750 ml", price: 2450, img: "Trumpeter-Cabernet-Franc.webp" },
  { id: "trumpeter-reserve-malbec", name: "Trumpeter Reserve Malbec", tag: "Reserva · 750 ml", price: 3160, img: "Trumpeter-Reserve-Malbec.webp" },
  { id: "rutini-malbec-magnum", name: "Colección Rutini Malbec 1,5 L", tag: "Con estuche · Magnum", price: 16560, img: "Estuche-Rutini-Malbec-Magnum--2021-.webp" },
  { id: "encuentro-malbec-magnum", name: "Colección Encuentro Malbec 1,5 L", tag: "Con estuche · Magnum", price: 4934, img: "Estuche-Encuentro-Malbec.webp" },
];

const $ = (s) => document.querySelector(s);
const money = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

/* Almacenamiento tolerante a fallos (modo privado, etc.) */
const store = {
  get(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin persistencia */ } },
};

/* ---------- Verificación de edad ---------- */
const gate = $("#agegate");
if (!store.get("mayor18", false)) gate.hidden = false;
$("#age-yes").addEventListener("click", () => { store.set("mayor18", true); gate.hidden = true; });

/* ---------- Catálogo ---------- */
$("#products").innerHTML = PRODUCTS.map((p) => `
  <article class="product reveal">
    <div class="product__img"><img src="${IMG}${p.img}" alt="${p.name}" loading="lazy"></div>
    <h3>${p.name}</h3>
    <p class="product__tag">${p.tag}</p>
    <p class="product__price">${money(p.price)}</p>
    <button class="btn" data-add="${p.id}">Añadir al carrito</button>
  </article>`).join("");

/* ---------- Carrito ---------- */
let cart = store.get("carrito", {}); // { id: cantidad }
const drawer = $("#drawer"), overlay = $("#overlay");

const save = () => { store.set("carrito", cart); renderCart(); };
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const total = () => Object.entries(cart).reduce((s, [id, q]) => s + (byId(id)?.price ?? 0) * q, 0);

function renderCart() {
  const items = Object.entries(cart).filter(([id]) => byId(id));
  $("#cart-count").textContent = items.reduce((s, [, q]) => s + q, 0);
  $("#cart-total").textContent = money(total());
  $("#cart-list").innerHTML = items.length
    ? items.map(([id, q]) => {
        const p = byId(id);
        return `<li>
          <img src="${IMG}${p.img}" alt="">
          <div><div class="name">${p.name}</div><div class="sub">${money(p.price)}</div>
            <div class="qty"><button data-dec="${id}" aria-label="Menos">−</button><span>${q}</span><button data-inc="${id}" aria-label="Más">+</button></div>
          </div>
          <strong>${money(p.price * q)}</strong>
        </li>`;
      }).join("")
    : `<li class="drawer__empty">Tu carrito está vacío.</li>`;
}

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", String(!open));
  overlay.hidden = !open;
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) { cart[add.dataset.add] = (cart[add.dataset.add] || 0) + 1; save(); toast("Se agregó al carrito"); return; }
  const inc = e.target.closest("[data-inc]");
  if (inc) { cart[inc.dataset.inc]++; save(); return; }
  const dec = e.target.closest("[data-dec]");
  if (dec) { if (--cart[dec.dataset.dec] <= 0) delete cart[dec.dataset.dec]; save(); }
});

$("#cart-open").addEventListener("click", () => setDrawer(true));
$("#cart-close").addEventListener("click", () => setDrawer(false));
overlay.addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrawer(false); });
$("#clear").addEventListener("click", () => { cart = {}; save(); });
$("#checkout").addEventListener("click", () => {
  const lines = Object.entries(cart).filter(([id]) => byId(id)).map(([id, q]) => `• ${q} × ${byId(id).name} — ${money(byId(id).price * q)}`);
  if (!lines.length) return toast("Agregá algo al carrito primero");
  const msg = `Hola! Quiero hacer este pedido:\n${lines.join("\n")}\n\nTotal: ${money(total())}`;
  window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});
renderCart();

/* ---------- Contacto ---------- */
$("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, err = $("#form-error");
  const d = Object.fromEntries(new FormData(f));
  if (d.nombre.trim().length < 3) return (err.textContent = "Ingresá tu nombre (mínimo 3 letras).");
  if (!/^\S+@\S+\.\S+$/.test(d.correo)) return (err.textContent = "Ingresá un correo válido.");
  if (d.mensaje.trim().length < 20) return (err.textContent = "Contanos un poco más (mínimo 20 caracteres).");
  err.textContent = "";
  const msg = `Hola! Soy ${d.nombre} ${d.apellido}.\nCorreo: ${d.correo}\n\n${d.mensaje}`;
  window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  f.reset();
  toast("¡Gracias! Te contactamos enseguida");
});

/* ---------- Navegación ---------- */
const nav = $("#nav"), links = $("#nav-links"), burger = $("#burger");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
});

/* ---------- Animación de entrada ---------- */
const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
