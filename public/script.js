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
    nome: "Brownie de Prestígio",
    categoria: "Doces Prontos",
    desc: "Brownie de prestígio, com aquela casquinha crocante por fora e um centro super úmido e cremoso, combinado com um recheio generoso de coco. Feito na hora do seu pedido.",
    preco: "R$ 11,99",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-brownie-coco.png", alt: "Brownie Coco" },
      { type: "image", src: "/imgs/foto-brownie-coco02.png", alt: "Brownie Coco" },
      { type: "image", src: "/imgs/foto-brownie-coco03.png", alt: "Brownie Coco" },
      { type: "image", src: "/imgs/foto-brownie-coco04.png", alt: "Brownie Coco" }
    ]
  },
  
  {
    nome: "Brownie de Doce de Leite",
    categoria: "Doces Prontos",
    desc: "Por fora, uma casquinha delicadamente crocante. Por dentro, um recheio de doce de leite cremoso e cheio de sabor.",
    preco: "R$ 10,99",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-brownie-doceleite01.jpeg", alt: "Brownie Doce de Leite" },
      { type: "image", src: "/imgs/foto-brownie-doceleite02.jpeg", alt: "Brownie Doce de Leite" },
      { type: "video", src: "imgs/video-brownie-doceleite.mp4", thumb: "/imgs/thumbdoceleite.png" }
    ]
  },

  {
    nome: "Bolo de Laranja com Cobertura de Limão",
    categoria: "Doces Sob Encomenda",
    desc: "Bolo de laranja macio e fofinho, coberto com uma deliciosa cobertura de limão, trazendo o equilíbrio perfeito entre o doce e o cítrico. Feito na hora do seu pedido.",
    preco: "R$ 65,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-bolo-laranja.png", alt: "Bolo de Laranja" },
      { type: "image", src: "/imgs/foto-bolo-laranja02.png", alt: "Bolo de Laranja" },
      { type: "image", src: "/imgs/foto-bolo-laranja03.png", alt: "Bolo de Laranja" }
    ]
  },

  {
    nome: "Bolo de Chocolate Granulado",
    categoria: "Doces Sob Encomenda",
    desc: "Bolo de chocolate super fofinho e úmido, coberto com uma calda cremosa e brilhante de chocolate e finalizado com muito granulado crocante. Feito na hora do seu pedido.",
    preco: "R$ 70,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-bolo-chocolate.png", alt: "Bolo de Chocolate" },
      { type: "image", src: "/imgs/foto-bolo-chocolate02.png", alt: "Bolo de Chocolate" },
      { type: "image", src: "/imgs/foto-bolo-chocolate03.jpeg", alt: "Bolo de Chocolate" }
    ]
  },

   {
    nome: "Bombom de Morango na Travessa",
    categoria: "Doces Sob Encomenda",
    desc: "Bombom de morango na travessa, combinando a doçura do creme e do chocolate com o frescor cítrico do morango. Montado em camadas perfeitas e feito na hora do seu pedido.",
    preco: "R$ 80,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/bombom-morango.jpeg", alt: "Bombom de Morango"},
      { type: "image", src: "/imgs/bombom-morango02.jpeg", alt: "Bombom de Morango" }
    ]
  },

  {
    nome: "Bombom de Uva na Travessa",
    categoria: "Doces Sob Encomenda",
    desc: "Bombom de morango na travessa, combinando a doçura do creme e do chocolate com o frescor cítrico do morango. Montado em camadas perfeitas e feito na hora do seu pedido.",
    preco: "R$ 80,00",
    unidade: "unidade",
    medias: [
      { type: "image", src: "/imgs/foto-bombom-uva.png", alt: "Bombom de Uva"},
      { type: "image", src: "/imgs/foto-bombom-uva02.png", alt: "Bombom de Uva" }
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
const categoryPages = {};

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
  const msg = encodeURIComponent(`Olá! Tenho interesse no ${produto.nome} da Pietrà Doces.`);
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
    const noteHtml = categoria === "Doces Sob Encomenda" ? '<p class="category-note">(Para Doces Sob Encomendas, pedidos com 24h de antecedência)</p>' : '';

    return `
      <div class="category-section">
        <h3 class="category-title">${categoria}</h3>
        ${noteHtml}
        <div class="category-row" id="${rowId}">
          ${cardsHtml}
        </div>
        <div class="category-nav" id="${rowId}-nav">
          <span class="category-page-info" id="${rowId}-info"></span>
          <button type="button" class="category-arrow prev" data-row-id="${rowId}" data-dir="-1" aria-label="Página anterior">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="category-arrow next" data-row-id="${rowId}" data-dir="1" aria-label="Próxima página">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>`;
  }).join("");

  // Inicializa todos os carrosséis de mídia dos cards
  produtos.forEach((p, i) => {
    initCarousel(`card-${i}`, p.medias?.length || 1);
  });

  document.querySelectorAll('.category-row').forEach((row) => {
    initCategoryPagination(row);
  });

  document.querySelectorAll(".card").forEach((el) => revealObserver.observe(el));
}

function initCategoryPagination(row) {
  const cards = Array.from(row.children);
  cards.forEach((card, index) => {
    card.dataset.itemIndex = index;
  });
  categoryPages[row.id] = { current: 0, totalPages: 1, pageSize: cards.length };
  syncCategoryPagination(row.id);
}

function changeCategoryPage(rowId, dir) {
  const state = categoryPages[rowId];
  if (!state) return;
  const next = Math.min(Math.max(0, state.current + dir), state.totalPages - 1);
  if (next === state.current) return;
  state.current = next;
  updateCategoryPage(rowId);
}

function bindCategoryButtons() {
  document.querySelectorAll('.category-arrow[data-row-id]').forEach((button) => {
    button.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const rowId = button.dataset.rowId;
      const dir = Number(button.dataset.dir) || 0;
      changeCategoryPage(rowId, dir);
      button.blur();
    });
  });
}

function syncCategoryPagination(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;

  const cards = Array.from(row.querySelectorAll('.card'));
  const gapValue = parseInt(getComputedStyle(row).gap, 10) || 28;
  const visibleWidth = row.clientWidth + gapValue;
  const cardWidth = 280 + gapValue;
  const columns = Math.max(1, Math.floor(visibleWidth / cardWidth));
  const rowsPerPage = 2;
  const pageSize = columns * rowsPerPage;
  const totalPages = Math.max(1, Math.ceil(cards.length / pageSize));

  const state = categoryPages[rowId] || { current: 0 };
  state.totalPages = totalPages;
  state.pageSize = pageSize;
  state.current = Math.min(state.current, totalPages - 1);
  categoryPages[rowId] = state;

  updateCategoryPage(rowId);
}

function updateCategoryPage(rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;

  const cards = Array.from(row.querySelectorAll('.card'));
  const state = categoryPages[rowId];
  if (!state) return;

  const start = state.current * state.pageSize;
  const end = start + state.pageSize;

  cards.forEach((card, index) => {
    card.style.display = index >= start && index < end ? '' : 'none';
  });

  const info = document.getElementById(`${rowId}-info`);
  const prevBtn = document.querySelector(`#${rowId}-nav .category-arrow.prev`);
  const nextBtn = document.querySelector(`#${rowId}-nav .category-arrow.next`);

  if (info) {
    info.textContent = `Página ${state.current + 1} de ${state.totalPages}`;
  }

  if (prevBtn) prevBtn.disabled = state.current === 0;
  if (nextBtn) nextBtn.disabled = state.current >= state.totalPages - 1;

  const nav = document.getElementById(`${rowId}-nav`);
  if (nav) {
    nav.style.display = state.totalPages > 1 ? 'flex' : 'none';
  }
}

// ----- Sincroniza paginação de cada categoria ao redimensionar -----
window.addEventListener('resize', () => {
  document.querySelectorAll('.category-row').forEach((row) => syncCategoryPagination(row.id));
});

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
    document.querySelectorAll('.category-row').forEach((row) => syncCategoryPagination(row.id));
  });

  bindCategoryButtons();

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