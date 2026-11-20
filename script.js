/* =====================================================
   SOL JÚLIO BEAUTY — CONFIGURAÇÕES
   Edite apenas esta parte para trocar preços, fotos,
   telefone, horários e perguntas do site.
   ===================================================== */
const CONFIG = {
  nome: "Sol Júlio Beauty",
  whatsapp: "5566992481554",          // DDI 55 + DDD 66 + número
  whatsappExibir: "(66) 99248-1554",
  horario: "Consulte os horários pelo WhatsApp", // ex.: "Seg a Sáb • 8h às 18h"
  endereco: "",                       // deixe vazio para ocultar
  instagram: "",                      // ex.: "@solgjulio" (vazio = oculta)
  horariosDisponiveis: { inicio: 8, fim: 18, passoMin: 30 },
  diasFechados: [0]                   // 0 = domingo. Ex.: [0, 1] fecha dom e seg
};

// "aPartirDe: true" mostra "a partir de" antes do valor.
// "preco: null" mostra "Consulte" (sem valor definido).
const SERVICOS = [
  { id: "design", nome: "Design de Sobrancelhas", icone: "✦", preco: 80, aPartirDe: false,
    desc: "Desenho personalizado que valoriza o formato do seu rosto e o seu olhar." },
  { id: "brow", nome: "Brow Lamination", icone: "✧", preco: 180, aPartirDe: false,
    desc: "Fios alinhados e preenchidos, com efeito de sobrancelha volumosa e natural." },
  { id: "coloracao", nome: "Coloração", icone: "❖", preco: 50, aPartirDe: false,
    desc: "Coloração para realçar e dar mais definição ao desenho." },
  { id: "henna", nome: "Henna", icone: "❀", preco: 45, aPartirDe: false,
    desc: "Aplicação de henna para preencher falhas e destacar o olhar." },
  { id: "make-express", nome: "Maquiagem Express", icone: "✿", preco: 150, aPartirDe: false,
    desc: "Make prática e elegante para quando você precisa de um visual rápido e bonito." },
  { id: "make-social", nome: "Maquiagem Social", icone: "❁", preco: 200, aPartirDe: false,
    desc: "Maquiagem completa para eventos, formaturas, festas e ocasiões especiais." },
  { id: "make-noiva", nome: "Maquiagem de Noiva", icone: "♡", preco: 1500, aPartirDe: false,
    desc: "Pacote completo para o seu grande dia. Incluso penteado, teste de cabelo e make." },
  { id: "penteado", nome: "Penteados", icone: "✧", preco: 180, aPartirDe: true,
    desc: "Penteados elegantes e duradouros. Valor sujeito a orçamento conforme o modelo." },
  { id: "tranca", nome: "Trança Simples", icone: "✦", preco: 100, aPartirDe: false,
    desc: "Trança bem feita, com acabamento delicado e charmoso." },
  { id: "depilacao", nome: "Depilação (Epilação Egípcia)", icone: "❀", preco: null, aPartirDe: false,
    desc: "Técnica egípcia com pasta natural, precisa e com pele macia por mais tempo." },
  { id: "escova", nome: "Escovista", icone: "❁", preco: null, aPartirDe: false,
    desc: "Escova modelada com brilho, movimento e acabamento profissional." }
];

// Galeria: coloque suas fotos na pasta "img" e ajuste os nomes.
// Enquanto a foto não existir, aparece um quadro elegante no lugar.
const GALERIA = [
  { src: "img/sobrancelha-1.jpg", cat: "Sobrancelhas", titulo: "Design de sobrancelhas" },
  { src: "img/sobrancelha-2.jpg", cat: "Sobrancelhas", titulo: "Brow lamination" },
  { src: "img/maquiagem-1.jpg",   cat: "Maquiagem",    titulo: "Maquiagem social" },
  { src: "img/maquiagem-2.jpg",   cat: "Maquiagem",    titulo: "Make para eventos" },
  { src: "img/penteado-1.jpg",    cat: "Penteados",    titulo: "Penteado para festa" },
  { src: "img/penteado-2.jpg",    cat: "Penteados",    titulo: "Penteado elegante" },
  { src: "img/escova-1.jpg",      cat: "Escova",       titulo: "Escova modelada" },
  { src: "img/depilacao-1.jpg",   cat: "Depilação",    titulo: "Epilação egípcia" }
];

const FAQ = [
  { q: "Como funciona o agendamento?",
    a: "Escolha os serviços, a data e o horário no formulário do site. Ao enviar, o WhatsApp abre com a mensagem pronta e nossa equipe confirma a disponibilidade com você." },
  { q: "Posso agendar mais de um serviço no mesmo dia?",
    a: "Sim! Selecione quantos serviços quiser no formulário. O valor total estimado é calculado automaticamente." },
  { q: "Os valores do site são finais?",
    a: "Os valores servem de referência e podem variar conforme o tipo de serviço, o tamanho do cabelo ou a complexidade do trabalho. O valor final é confirmado pelo WhatsApp." },
  { q: "Quais são as formas de pagamento?",
    a: "Consulte as formas de pagamento disponíveis diretamente pelo WhatsApp ao agendar." },
  { q: "Preciso de horário marcado?",
    a: "Sim, o atendimento é com hora marcada para garantir todo o cuidado em cada detalhe." }
];

/* =====================================================
   CÓDIGO DO SITE
   ===================================================== */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const precoTxt = s =>
  s.preco == null ? "Sob consulta" : (s.aPartirDe ? "a partir de " : "") + brl(s.preco);
const waLink = (texto = "") =>
  `https://wa.me/${CONFIG.whatsapp}${texto ? "?text=" + encodeURIComponent(texto) : ""}`;

/* ---- Links de WhatsApp genéricos ---- */
function initWhatsLinks() {
  const msg = `Olá! Vi o site da ${CONFIG.nome} e gostaria de agendar um horário.`;
  $$(".js-whats").forEach(a => {
    a.href = waLink(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$(".js-phone").forEach(a => (a.textContent = CONFIG.whatsappExibir));
}

/* ---- Menu mobile + header ---- */
function initHeader() {
  const header = $(".header");
  const nav = $("#nav");
  const btn = $("#menuBtn");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---- Serviços ---- */
function renderServices() {
  const grid = $("#servicesGrid");
  grid.innerHTML = SERVICOS.map(s => `
    <article class="service reveal" data-id="${s.id}">
      <div class="service__icon">${s.icone}</div>
      <h3 class="service__name">${s.nome}</h3>
      <p class="service__desc">${s.desc}</p>
      <div class="service__foot">
        <div class="service__price">
          <small>${s.preco != null && s.aPartirDe ? "a partir de" : "valor"}</small>${s.preco == null ? "Consulte" : brl(s.preco)}
        </div>
        <button type="button" class="service__btn" data-id="${s.id}">Escolher</button>
      </div>
    </article>
  `).join("");

  grid.addEventListener("click", e => {
    const b = e.target.closest(".service__btn");
    if (!b) return;
    const input = $(`#serviceChecks input[value="${b.dataset.id}"]`);
    input.checked = !input.checked;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    if (input.checked) $("#agendar").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---- Formulário de agendamento ---- */
function renderBooking() {
  // checkboxes
  $("#serviceChecks").innerHTML = SERVICOS.map(s => `
    <label class="check">
      <input type="checkbox" name="servico" value="${s.id}">
      <span class="check__box">
        <span class="check__mark">✓</span>
        <span>${s.nome}</span>
      </span>
      <span class="check__price">${precoTxt(s)}</span>
    </label>
  `).join("");

  // horários
  const { inicio, fim, passoMin } = CONFIG.horariosDisponiveis;
  const horas = ['<option value="">Selecione</option>'];
  for (let m = inicio * 60; m <= fim * 60; m += passoMin) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    horas.push(`<option value="${h}:${mm}">${h}:${mm}</option>`);
  }
  $("#hora").innerHTML = horas.join("");

  // data mínima = hoje
  const hoje = new Date();
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $("#data").min = iso(hoje);

  const form = $("#bookingForm");
  const totalEl = $("#totalValor");

  const selecionados = () =>
    $$('input[name="servico"]:checked', form).map(i => SERVICOS.find(s => s.id === i.value));

  const atualizar = () => {
    const sel = selecionados();
    const total = sel.reduce((t, s) => t + (s.preco || 0), 0);
    const temAPartir = sel.some(s => s.aPartirDe || s.preco == null);
    totalEl.textContent = !sel.length ? brl(0)
      : total === 0 ? "Sob consulta"
      : (temAPartir ? "a partir de " : "") + brl(total);
    // sincroniza cartões
    $$(".service").forEach(c => c.classList.toggle("is-selected", sel.some(s => s.id === c.dataset.id)));
    $$(".service__btn").forEach(b => {
      const on = sel.some(s => s.id === b.dataset.id);
      b.textContent = on ? "Selecionado ✓" : "Escolher";
    });
    if (sel.length) $("#errServ").hidden = true;
  };
  form.addEventListener("change", atualizar);

  // envio
  form.addEventListener("submit", e => {
    e.preventDefault();
    const sel = selecionados();
    const nome = $("#nome");
    const data = $("#data");
    const hora = $("#hora");
    let ok = true;

    [nome, data, hora].forEach(i => i.classList.remove("is-invalid"));
    $("#errServ").hidden = sel.length > 0;
    if (!sel.length) ok = false;
    if (!nome.value.trim()) { nome.classList.add("is-invalid"); ok = false; }
    if (!data.value) { data.classList.add("is-invalid"); ok = false; }
    if (!hora.value) { hora.classList.add("is-invalid"); ok = false; }

    if (data.value) {
      const [a, m, d] = data.value.split("-").map(Number);
      const dia = new Date(a, m - 1, d).getDay();
      if (CONFIG.diasFechados.includes(dia)) {
        data.classList.add("is-invalid");
        alert("Nesse dia não há atendimento. Por favor, escolha outra data.");
        ok = false;
      }
    }
    if (!ok) return;

    const [a, m, d] = data.value.split("-");
    const total = sel.reduce((t, s) => t + (s.preco || 0), 0);
    const temAPartir = sel.some(s => s.aPartirDe || s.preco == null);
    const totalTxt = total === 0 ? "a combinar" : (temAPartir ? "a partir de " : "") + brl(total);

    const linhas = [
      `Olá! Meu nome é *${nome.value.trim()}* e gostaria de agendar um horário na ${CONFIG.nome}.`,
      "",
      "*Serviços:*",
      ...sel.map(s => `• ${s.nome} — ${precoTxt(s)}`),
      "",
      `*Total estimado:* ${totalTxt}`,
      `*Data:* ${d}/${m}/${a}`,
      `*Horário:* ${hora.value}`
    ];
    const obs = $("#obs").value.trim();
    if (obs) linhas.push("", `*Observações:* ${obs}`);

    window.open(waLink(linhas.join("\n")), "_blank", "noopener");
  });
}

/* ---- Galeria + filtros + lightbox ---- */
function renderGallery() {
  const grid = $("#galleryGrid");
  const cats = ["Todos", ...new Set(GALERIA.map(g => g.cat))];

  $("#galleryFilters").innerHTML = cats.map((c, i) =>
    `<button type="button" class="filter${i === 0 ? " is-active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");

  const placeholder = g => `<div class="shot__ph"><div>${g.titulo}<small>${g.cat}</small></div></div>`;

  grid.innerHTML = GALERIA.map((g, i) => `
    <button type="button" class="shot reveal" data-i="${i}" data-cat="${g.cat}" aria-label="Ampliar: ${g.titulo}">
      <img src="${g.src}" alt="${g.titulo}" loading="lazy">
      <span class="shot__label">${g.titulo}</span>
    </button>
  `).join("");

  // se a foto não existir, mostra o quadro elegante
  $$(".shot img", grid).forEach(img => {
    img.addEventListener("error", () => {
      const g = GALERIA[img.closest(".shot").dataset.i];
      img.outerHTML = placeholder(g);
    });
  });

  $("#galleryFilters").addEventListener("click", e => {
    const b = e.target.closest(".filter");
    if (!b) return;
    $$(".filter").forEach(f => f.classList.toggle("is-active", f === b));
    $$(".shot", grid).forEach(s =>
      s.classList.toggle("is-hidden", b.dataset.cat !== "Todos" && s.dataset.cat !== b.dataset.cat)
    );
  });

  // lightbox
  const lb = $("#lightbox");
  const body = $("#lbBody");
  const cap = $("#lbCap");
  const abrir = i => {
    const g = GALERIA[i];
    const img = $(`.shot[data-i="${i}"] img`);
    body.innerHTML = img ? `<img src="${g.src}" alt="${g.titulo}">` : placeholder(g);
    cap.textContent = `${g.titulo} • ${g.cat}`;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  };
  const fechar = () => { lb.hidden = true; body.innerHTML = ""; document.body.style.overflow = ""; };

  grid.addEventListener("click", e => {
    const s = e.target.closest(".shot");
    if (s) abrir(Number(s.dataset.i));
  });
  $("#lbClose").addEventListener("click", fechar);
  lb.addEventListener("click", e => { if (e.target === lb) fechar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) fechar(); });
}

/* ---- FAQ ---- */
function renderFaq() {
  $("#faqList").innerHTML = FAQ.map(f => `
    <details>
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>
  `).join("");
}

/* ---- Contato ---- */
function renderContact() {
  $("#horarioTxt").textContent = CONFIG.horario;
  if (CONFIG.endereco) {
    $("#enderecoTxt").textContent = CONFIG.endereco;
    $("#liEndereco").hidden = false;
  }
  if (CONFIG.instagram) {
    const user = CONFIG.instagram.replace("@", "");
    const a = $("#instaLink");
    a.href = `https://instagram.com/${user}`;
    a.textContent = "@" + user;
    $("#liInsta").hidden = false;
  }
  $("#ano").textContent = new Date().getFullYear();
}

/* ---- Animação ao rolar ---- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("is-visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => io.observe(el));
}

/* ---- Início ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderBooking();
  renderGallery();
  renderFaq();
  renderContact();
  initWhatsLinks();
  initHeader();
  initReveal();
});
