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
//
// NOVO: cada produto agora tem um campo "categoria".
// Produtos com a mesma categoria são agrupados na mesma "prateleira".
// Basta trocar/adicionar categorias novas que elas aparecem automaticamente
// como novas seções no catálogo.

const produtos = [
  {
    nome: "Brownie Tradicional",
    categoria: "Doces Prontos",
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
    categoria: "Doces Prontos",
    desc: "Por fora, uma casquinha delicadamente crocante. Por dentro, um recheio de doce de leite cremoso e cheio de sabor.",
    preco: "R$ 10,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-brownie-doceleite01.jpeg", alt: "Brownie Doce de Leite" },
      { type: "image", src: "/imgs/foto-brownie-doceleite02.jpeg", alt: "Brownie Doce de Leite" },
      { type: "video", src: "imgs/video-brownie-doceleite.mp4", thumb: "/imgs/thumbdoceleite.png" }
    ]
  },

  {
    nome: "Bolo no Pote Ninho com Nutella",
    categoria: "Doces Sob Encomenda",
    desc: "Camadas de bolo fofinho, creme de leite ninho e nutella. Feito na hora do seu pedido.",
    preco: "R$ 14,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-bolo-pote01.jpeg", alt: "Bolo no Pote Ninho com Nutella" }
    ]
  }

  // Exemplo de como adicionar mais um item na mesma categoria "Doces Sob Encomenda":
  // {
  //   nome: "Torta de Morango",
  //   categoria: "Doces Sob Encomenda",
  //   desc: "...",
  //   preco: "R$ 60,00",
  //   unidade: "unidade",
  //   medias: [ { type: "image", src: "/imgs/foto.jpg", alt: "Torta de Morango" } ]
  // },
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

// ----- Swipe (dentro do carrossel de mídias do card) -----
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

// ----- Renderiza um card individual (usado dentro de cada categoria) -----
function renderCard(produto, prodIndex) {
  const cardId = `card-${prodIndex}`;
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${produto.nome} da Pietra Doces.`);
  const link = `https://wa.me/${TELEFONE}?text=${msg}`;

  return `
    <article class="card">
      <div class="card-media-wrap">
        ${renderCarousel(produto, cardId)}
      </div>
      <div class="card-body">
        <h3>${produto.nome}</h3>
        <p class="card-desc">${produto.desc}</p>
        <div class="card-foot">
          <div class="card-price">${produto.preco}<br><span>${produto.unidade}</span></div>
          <a href="${link}" target="_blank" rel="noopener" class="btn-wa">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.4A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.5.1.2.6 1 1.3 1.7.9.8 1.7 1.1 1.9 1.2.2.1.3.1.5-.1.1-.2.5-.6.7-.8.1-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1.2z"/></svg>
            Comprar
          </a>
        </div>
      </div>
    </article>`;
}

// ----- Agrupa produtos por categoria, preservando o índice original -----
// (o índice original é o que o carrossel/lightbox usam para achar o produto certo)
function agruparPorCategoria(lista) {
  const grupos = new Map();
  lista.forEach((produto, index) => {
    const categoria = produto.categoria || "Outros Doces";
    if (!grupos.has(categoria)) grupos.set(categoria, []);
    grupos.get(categoria).push({ produto, index });
  });
  return grupos;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ----- Renderiza catálogo segmentado por categoria -----
function renderProdutos() {
  const container = document.getElementById("grid-produtos");
  if (!container) return;

  const grupos = agruparPorCategoria(produtos);

  container.innerHTML = Array.from(grupos.entries()).map(([categoria, itens]) => {
    const rowId = `row-${slugify(categoria)}`;
    const cardsHtml = itens.map(({ produto, index }) => renderCard(produto, index)).join('');

    return `
      <div class="category-section">
        <h3 class="category-title">${categoria}</h3>
        <div class="category-scroll-wrap">
          <button class="category-arrow prev" onclick="scrollCategory('${rowId}', -1)" aria-label="Ver anteriores">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="category-row" id="${rowId}">
            ${cardsHtml}
          </div>
          <button class="category-arrow next" onclick="scrollCategory('${rowId}', 1)" aria-label="Ver próximos">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>`;
  }).join("");

  // Inicializa todos os carrosséis de mídia dos cards
  produtos.forEach((p, i) => {
    initCarousel(`card-${i}`, p.medias?.length || 1);
  });

  // Inicializa comportamento das prateleiras (setas + arrastar)
  document.querySelectorAll('.category-row').forEach((row) => {
    updateCategoryArrows(row.id);
    row.addEventListener('scroll', () => updateCategoryArrows(row.id), { passive: true });
    initDragScroll(row);
  });

  document.querySelectorAll(".card").forEach((el) => revealObserver.observe(el));
}

// ----- Seta: rola a prateleira da categoria para o lado -----
function scrollCategory(rowId, dir) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const amount = row.clientWidth * 0.85;
  row.scrollBy({ left: dir * amount, behavior: 'smooth' });
}

// ----- Mostra/esconde e habilita/desabilita as setas conforme o scroll -----
function updateCategoryArrows(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const wrap = row.closest('.category-scroll-wrap');
  if (!wrap) return;
  const prevBtn = wrap.querySelector('.category-arrow.prev');
  const nextBtn = wrap.querySelector('.category-arrow.next');
  if (!prevBtn || !nextBtn) return;

  const maxScroll = row.scrollWidth - row.clientWidth;

  if (maxScroll <= 4) {
    // Cabe tudo na tela: não precisa de setas
    prevBtn.classList.add('is-hidden');
    nextBtn.classList.add('is-hidden');
    return;
  }

  prevBtn.classList.remove('is-hidden');
  nextBtn.classList.remove('is-hidden');
  prevBtn.disabled = row.scrollLeft <= 4;
  nextBtn.disabled = row.scrollLeft >= maxScroll - 4;
}

// ----- Permite arrastar a prateleira com o mouse (clicar e arrastar) -----
function initDragScroll(row) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  row.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    row.classList.add('is-dragging');
    startX = e.pageX;
    startScroll = row.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    row.classList.remove('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const diff = e.pageX - startX;
    if (Math.abs(diff) > 5) moved = true;
    row.scrollLeft = startScroll - diff;
  });

  // Evita que um "arrastar" vire clique acidental em um card/botão
  row.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
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

  window.addEventListener("resize", () => {
    document.querySelectorAll('.category-row').forEach((row) => updateCategoryArrows(row.id));
  });

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