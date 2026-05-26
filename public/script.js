/* =========================================================
   Pietra Doces — Scripts
========================================================= */

// ----- Catálogo de produtos -----
const produtos = [
  {
    nome: "Brownie",
    desc: "Chocolate belga 70%, casquinha crocante e centro úmido e cremoso.",
    preco: "R$ 12,00",
    unidade: "unidade",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80"
  },
  {
    nome: "Brigadeiro Gourmet",
    desc: "Receita artesanal com cacau nobre e finalização em granulado belga.",
    preco: "R$ 5,00",
    unidade: "unidade",
    img: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80"
  },
  {
    nome: "Banoffee",
    desc: "Banana caramelizada, doce de leite artesanal e chantilly fresco.",
    preco: "R$ 18,00",
    unidade: "porção",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"
  },
  {
    nome: "Copo da Felicidade",
    desc: "Camadas de brownie, brigadeiro e ganache em copo individual.",
    preco: "R$ 22,00",
    unidade: "copo 200ml",
    img: "https://images.unsplash.com/photo-1551529834-525807d6b4f3?w=800&q=80"
  },
  {
    nome: "Bolo no Pote",
    desc: "Massa fofinha, recheio cremoso e cobertura especial em camadas.",
    preco: "R$ 16,00",
    unidade: "pote 250ml",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"
  },
  {
    nome: "Cookie Recheado",
    desc: "Massa amanteigada com gotas de chocolate e recheio surpresa.",
    preco: "R$ 14,00",
    unidade: "unidade",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80"
  },
  {
    nome: "Palha Italiana",
    desc: "Brigadeiro firme com biscoito crocante e açúcar de confeiteiro.",
    preco: "R$ 6,00",
    unidade: "unidade",
    img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80"
  },
  {
    nome: "Caixa Premium",
    desc: "Seleção especial dos nossos doces em embalagem sofisticada para presentear.",
    preco: "R$ 89,00",
    unidade: "caixa c/ 12",
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80"
  }
];

const TELEFONE = "5511999999999";

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
});
