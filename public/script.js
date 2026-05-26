/* =========================================================
   Pietra Doces — Scripts
========================================================= */

// ----- Catálogo de produtos -----
const produtos = [
  {
    nome: "Brownie Tradicional",
    desc: "Brownie tradicional com gotas de chocolate, casquinha crocante e centro úmido e cremoso.",
    preco: "R$ 12,00",
    unidade: "unidade",
    img: "/imgs/foto-brownie02.jpeg"
  }
];

const TELEFONE = "5519992325682";

// ----- Renderiza catálogo -----
function renderProdutos() {
  const grid = document.getElementById("grid-produtos");
  if (!grid) return;

  grid.innerHTML = produtos.map((p) => {
    const msg = encodeURIComponent(`Olá! Tenho interesse no produto ${p.nome} da Pietra Doces.`);
    const link = `https://wa.me/${TELEFONE}?text=${msg}`;
    return `
      <article class="card">
        <div class="card-img-wrap">
          <div class="card-img" style="background-image:url('${p.img}')"></div>
        </div>
        <div class="card-body">
          <h3>${p.nome}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-foot">
            <div class="card-price">${p.preco}<br><span>${p.unidade}</span></div>
            <a href="${link}" target="_blank" rel="noopener" class="btn-wa">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.5.1.2.6 1 1.3 1.7.9.8 1.7 1.1 1.9 1.2.2.1.3.1.5-.1.1-.2.5-.6.7-.8.1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1.2z"/></svg>
              Comprar
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // observa cards para reveal animado
  document.querySelectorAll(".card").forEach((el) => revealObserver.observe(el));
}

// ----- Header com fundo ao rolar -----
function handleScroll() {
  const header = document.getElementById("header");
  if (!header) return;
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}

// ----- Animação reveal -----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
  renderProdutos();
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu hamburguer
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector(".nav");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  // fecha ao clicar fora do menu
  nav.addEventListener("click", (e) => {
    if (e.target === nav) nav.classList.remove("open");
  });
});