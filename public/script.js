/* =========================================================
   Pietra Doces — Scripts com Carrossel de Mídias
========================================================= */

// ----- Catálogo de Produtos -----
// Para adicionar múltiplas mídias, use o array "medias"
// Exemplo de produto com imagem e vídeo:
// medias: [
//   { type: "image", src: "/imgs/foto.jpg", alt: "Descrição" },
//   { type: "video", src: "/imgs/video.mp4", thumb: "/imgs/thumb.jpg" }
// ]

const produtos = [
  {
    nome: "Brownie Tradicional",
    desc: "Chocolate, casquinha crocante e centro úmido e cremoso.",
    preco: "R$ 8,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-brownie02.jpeg", alt: "Brownie Tradicional" },
      { type: "image", src: "/imgs/foto-brownie01.png", alt: "Brownie Tradicional" }
    ]
  },

  {
    nome: "Brownie de Doce de Leite",
    desc: "Por fora, uma casquinha delicadamente crocante. Por dentro, um recheio de doce de leite cremoso e cheio de sabor.",
    preco: "R$ 10,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-brownie-doceleite01.jpeg", alt: "Brownie Doce de Leite" },
      { type: "image", src: "/imgs/foto-brownie-doceleite02.jpeg", alt: "Brownie Doce de Leite" },
      { type: "video", src: "imgs/video-brownie-doceleite.mp4", thumb:"/imgs/thumbdoceleite.png"}
    ]
  }
];

const TELEFONE = "5519992325682";

// ----- Estado dos Carrosséis -----
const carousels = {};

// ----- Renderiza HTML do Carrossel -----
function renderCarousel(produto, cardId) {
  const { medias } = produto;
  if (!medias || medias.length === 0) {
    return '<div class="carousel-empty">Sem mídia</div>';
  }

  const slides = medias.map((m, i) => {
    if (m.type === "video") {
      return `
        <div class="carousel-slide" data-index="${i}">
          <video class="carousel-video"
            src="${m.src}"
            preload="none"
            poster="${m.thumb || ''}"
            controls
            playsinline>
          </video>
          <div class="play-overlay" onclick="this.style.display='none';this.previousElementSibling.play()">
            <svg viewBox="0 0 24 24" width="52" height="52" fill="white"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>`;
    }
    return `
      <div class="carousel-slide" data-index="${i}">
        <img
          ${i === 0 ? `src="${m.src}"` : `data-src="${m.src}"`}
          alt="${m.alt || produto.nome}"
          class="carousel-img${i !== 0 ? ' lazy' : ''}"
          onclick="openLightbox('${cardId}', ${i})"
          loading="${i === 0 ? 'eager' : 'lazy'}"
        />
      </div>`;
  }).join('');

  const arrows = medias.length > 1 ? `
    <button class="carousel-arrow prev" onclick="prevSlide('${cardId}')" aria-label="Anterior">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="carousel-arrow next" onclick="nextSlide('${cardId}')" aria-label="Próximo">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>` : '';

  const dots = medias.length > 1 ? `
    <div class="carousel-dots">
      ${medias.map((_, i) => `
        <button class="dot${i === 0 ? ' active' : ''}" onclick="goToSlide('${cardId}', ${i})" aria-label="Slide ${i + 1}"></button>
      `).join('')}
    </div>` : '';

  const thumbs = medias.length > 1 ? `
    <div class="carousel-thumbs">
      ${medias.map((m, i) => {
        const thumbSrc = m.type === "video" ? (m.thumb || '') : m.src;
        return `
          <button class="thumb${i === 0 ? ' active' : ''}" onclick="goToSlide('${cardId}', ${i})" aria-label="Miniatura ${i + 1}">
            ${m.type === "video" ? `
              <div class="thumb-video-wrap">
                <img src="${thumbSrc}" alt="Vídeo" loading="lazy" />
                <svg class="thumb-play" viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>` : `
              <img src="${m.src}" alt="${m.alt || ''}" loading="lazy" />`}
          </button>`;
      }).join('')}
    </div>` : '';

  return `
    <div class="carousel" id="${cardId}">
      <div class="carousel-track-wrap">
        <div class="carousel-track">${slides}</div>
        ${arrows}
      </div>
      ${dots}
      ${thumbs}
    </div>`;
}

// ----- Inicializa carrossel -----
function initCarousel(cardId, total) {
  carousels[cardId] = { current: 0, total };
  initSwipe(cardId);
}

// ----- Ir para slide -----
function goToSlide(cardId, index) {
  const state = carousels[cardId];
  if (!state) return;

  const carousel = document.getElementById(cardId);
  if (!carousel) return;

  // Pausa vídeos
  carousel.querySelectorAll('video').forEach(v => v.pause());
  carousel.querySelectorAll('.play-overlay').forEach(o => o.style.display = '');

  state.current = index;

  // Move track
  const track = carousel.querySelector('.carousel-track');
  if (track) track.style.transform = `translateX(-${index * 100}%)`;

  // Atualiza dots
  carousel.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));

  // Atualiza thumbs
  carousel.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === index));

  // Lazy load imagem atual e próxima
  [index, index + 1].forEach(idx => {
    const img = carousel.querySelector(`.carousel-slide[data-index="${idx}"] img.lazy`);
    if (img && img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    }
  });
}

function nextSlide(cardId) {
  const state = carousels[cardId];
  if (!state) return;
  goToSlide(cardId, (state.current + 1) % state.total);
}

function prevSlide(cardId) {
  const state = carousels[cardId];
  if (!state) return;
  goToSlide(cardId, (state.current - 1 + state.total) % state.total);
}

// ----- Swipe -----
function initSwipe(cardId) {
  const carousel = document.getElementById(cardId);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  if (!track) return;

  let startX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide(cardId) : prevSlide(cardId);
    }
  }, { passive: true });
}

// ----- Lightbox -----
let lightboxState = { cardId: null, current: 0, total: 0 };

function openLightbox(cardId, index) {
  const prodIndex = parseInt(cardId.split('-')[1]);
  const produto = produtos[prodIndex];
  if (!produto) return;

  const state = carousels[cardId];
  lightboxState = { cardId, current: index, total: state.total, produto };

  renderLightboxContent(produto, index);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.querySelector('.lightbox-content').innerHTML = '';
  lightboxState = { cardId: null, current: 0, total: 0 };
}

function renderLightboxContent(produto, index) {
  const media = produto.medias[index];
  const total = produto.medias.length;
  const content = document.querySelector('.lightbox-content');

  let mediaEl = '';
  if (media.type === 'video') {
    mediaEl = `<video src="${media.src}" controls autoplay playsinline style="max-width:90vw;max-height:80vh;border-radius:8px;"></video>`;
  } else {
    mediaEl = `<img src="${media.src}" alt="${media.alt || produto.nome}" style="max-width:90vw;max-height:80vh;object-fit:contain;border-radius:8px;display:block;" />`;
  }

  const arrows = total > 1 ? `
    <button class="lb-arrow lb-prev" onclick="lightboxNav(-1)" aria-label="Anterior">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="lb-arrow lb-next" onclick="lightboxNav(1)" aria-label="Próximo">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>` : '';

  content.innerHTML = `
    ${arrows}
    <div class="lb-media">${mediaEl}</div>
    ${total > 1 ? `<div class="lb-counter">${index + 1} / ${total}</div>` : ''}
  `;
}

function lightboxNav(dir) {
  const { cardId, total, produto } = lightboxState;
  document.querySelector('.lightbox-content video')?.pause();
  const next = (lightboxState.current + dir + total) % total;
  lightboxState.current = next;
  renderLightboxContent(produto, next);
  goToSlide(cardId, next);
}

// ----- Cria Lightbox no DOM -----
function createLightbox() {
  if (document.getElementById('lightbox')) return;
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox-overlay" onclick="closeLightbox()"></div>
    <button class="lb-close" onclick="closeLightbox()" aria-label="Fechar">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
    <div class="lightbox-content"></div>
  `;
  document.body.appendChild(lb);

  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft') lightboxNav(-1);
  });
}

// ----- Renderiza catálogo -----
function renderProdutos() {
  const grid = document.getElementById("grid-produtos");
  if (!grid) return;

  grid.innerHTML = produtos.map((p, i) => {
    const cardId = `card-${i}`;
    const msg = encodeURIComponent(`Olá! Tenho interesse no ${p.nome} da Pietra Doces.`);
    const link = `https://wa.me/${TELEFONE}?text=${msg}`;

    return `
      <article class="card">
        <div class="card-media-wrap">
          ${renderCarousel(p, cardId)}
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
      </article>`;
  }).join("");

  // Inicializa todos os carrosséis
  produtos.forEach((p, i) => {
    initCarousel(`card-${i}`, p.medias?.length || 1);
  });

  document.querySelectorAll(".card").forEach((el) => revealObserver.observe(el));
}

// ----- Header scroll -----
function handleScroll() {
  const header = document.getElementById("header");
  if (!header) return;
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}

// ----- Reveal on scroll -----
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
  createLightbox();
  renderProdutos();
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu hamburguer
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });

    nav.addEventListener("click", (e) => {
      if (e.target === nav) nav.classList.remove("open");
    });
  }
});