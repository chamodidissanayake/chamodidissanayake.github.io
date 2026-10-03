/*
  Renders everything in data.js into the page.
  You shouldn't need to edit this file for content changes - edit data.js instead.
*/
(function () {
  const D = window.SITE_DATA;
  if (!D) return;
  const P = D.profile || {};

  // ---------------------------------------------------------------- helpers
  const $ = (id) => document.getElementById(id);
  const esc = (s) => (s == null ? "" : String(s))
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };
  const asList = (x) => (x ? (Array.isArray(x) ? x : [x]) : []);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // "2026-09" -> "Sep 2026", "2026-09-14" -> "14 Sep 2026", anything else unchanged
  function fmtDate(d) {
    if (!d) return "";
    const m = String(d).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
    if (!m) return String(d);
    const mon = MONTHS[parseInt(m[2], 10) - 1];
    return m[3] ? `${parseInt(m[3], 10)} ${mon} ${m[1]}` : `${mon} ${m[1]}`;
  }
  const sortKey = (d) => String(d || "").replace(/[^\d]/g, "").padEnd(8, "0").slice(0, 8);

  // Figures / point-cloud renders (anything in assets/gallery, or any .png): shown whole, never cropped.
  const isFigure = (src) => /assets\/gallery\/|\.png$/i.test(src || "");
  // Paint the frame around a figure in the figure's own background colour (e.g. white or black).
  // Works on the published site; when opened as a local file the browser blocks it and the dark default stays.
  function matchFigureBackground(img, frame) {
    try {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      frame.style.background = `rgb(${r}, ${g}, ${b})`;
    } catch (e) { /* keep default */ }
  }

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M9 10v6M9 7.5v.1M12 10h2a3 3 0 010 6h-2z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 10.5V16M8 8v.1M11.5 16v-5.5M11.5 13c0-2 4.5-3 4.5 0v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6 11v4c2 2 10 2 12 0v-4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14l10-10M14 4h6v6M18 14v6H4V6h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cv: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z M14 3v4h4M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    photo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="10.5" r="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M21 15l-5-5-4 4-3-3-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
  };

  function linkButton(label, href, icon, primary) {
    const a = el("a", "btn" + (primary ? " btn-primary" : ""), `${ICONS[icon] || ""}<span>${esc(label)}</span>`);
    a.href = href;
    if (!href.startsWith("mailto:") && !href.startsWith("#")) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  const profileLinks = () => [
    ["Email", P.email && `mailto:${P.email}`, "email", true],
    ["CV (PDF)", P.cvUrl, "cv"],
    ["ORCID", P.orcid, "orcid"],
    ["Google Scholar", P.googleScholar, "scholar"],
    ["LinkedIn", P.linkedin, "linkedin"],
    ["ResearchGate", P.researchgate, "link"],
    ["GitHub", P.github, "link"]
  ].filter((l) => l[1]);

  // ---------------------------------------------------------------- lightbox
  const lb = { box: $("lightbox"), img: $("lb-img"), cap: $("lb-caption"), items: [], i: 0, last: null };
  function openLightbox(items, index) {
    lb.items = items; lb.i = index; lb.last = document.activeElement;
    lb.box.hidden = false;
    document.body.style.overflow = "hidden";
    showLightbox();
    $("lb-close").focus();
  }
  function showLightbox() {
    const it = lb.items[lb.i];
    lb.img.src = it.src;
    lb.img.alt = it.caption || "";
    lb.img.classList.toggle("is-figure", isFigure(it.src));
    lb.cap.textContent = it.caption || "";
    const multi = lb.items.length > 1;
    $("lb-prev").hidden = !multi; $("lb-next").hidden = !multi;
    if (multi) lb.cap.textContent += `${it.caption ? "  ·  " : ""}${lb.i + 1} / ${lb.items.length}`;
  }
  function closeLightbox() {
    lb.box.hidden = true; lb.img.src = "";
    document.body.style.overflow = "";
    if (lb.last) lb.last.focus();
  }
  const step = (n) => { lb.i = (lb.i + n + lb.items.length) % lb.items.length; showLightbox(); };
  $("lb-close").onclick = closeLightbox;
  $("lb-prev").onclick = () => step(-1);
  $("lb-next").onclick = () => step(1);
  lb.box.addEventListener("click", (e) => { if (e.target === lb.box) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (lb.box.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // A clickable, lazily-loaded image. `items`/`index` define what the lightbox shows.
  function thumb(src, caption, items, index, cls) {
    const b = el("button", "thumb" + (cls ? " " + cls : "") + (isFigure(src) ? " is-figure" : ""));
    b.type = "button";
    b.setAttribute("aria-label", "Enlarge image" + (caption ? ": " + caption : ""));
    const img = el("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = caption || "";
    if (isFigure(src)) img.onload = () => matchFigureBackground(img, b);
    img.src = src;
    img.onerror = () => { b.classList.add("missing"); b.innerHTML = ICONS.photo; b.title = "Image not found: " + src; };
    b.appendChild(img);
    b.addEventListener("click", () => openLightbox(items, index));
    return b;
  }
  // Row of equally sized tiles (max 3) - tiles keep the same size whether there are 1, 2 or 3.
  function photoRow(photos, caption) {
    const list = asList(photos).filter(Boolean).slice(0, 3);
    if (!list.length) return null;
    const items = list.map((src) => ({ src, caption }));
    const row = el("div", "photo-row");
    list.forEach((src, i) => row.appendChild(thumb(src, caption, items, i)));
    return row;
  }
  function statusTag(status) {
    if (!status) return "";
    const label = { "in-prep": "in preparation", "in-review": "under review" }[status] || status;
    return `<span class="status" data-status="${esc(status)}">${esc(label)}</span>`;
  }

  // ---------------------------------------------------------------- hero + nav
  document.title = `${P.name} - ${P.role}`;
  $("hero-name").textContent = P.name;
  $("hero-kicker").textContent = P.role;
  $("hero-role").textContent = P.focus || "";
  $("hero-org").textContent = [P.institution, P.group].filter(Boolean).join(" · ");
  $("hero-tagline").textContent = P.tagline || "";
  $("nav-brand").textContent = P.name;
  if (P.heroImage) $("hero-bg").style.backgroundImage = `url("${P.heroImage}")`;

  const heroPhoto = $("hero-photo");
  if (P.photo) {
    heroPhoto.src = P.photo;
    heroPhoto.alt = `Portrait of ${P.name}`;
  } else {
    heroPhoto.replaceWith(el("div", "hero-photo hero-initials",
      esc((P.name || "?").split(/\s+/).map((w) => w[0]).slice(0, 2).join(""))));
  }
  const heroLinks = $("hero-links");
  profileLinks().forEach(([label, href, icon, primary]) => heroLinks.appendChild(linkButton(label, href, icon, primary)));

  // ---------------------------------------------------------------- about
  asList(P.bio).forEach((p) => $("bio-content").appendChild(el("p", null, esc(p))));
  asList(P.interests).forEach((t) => $("interests").appendChild(el("span", "chip", esc(t))));

  const pubs = D.publications || [];
  const events = D.research_trainings || [];
  const countries = new Set(events.map((e) => (e.location || "").split(",").pop().trim()).filter(Boolean));
  const stats = [
    [pubs.filter((p) => p.type === "Journal article" && p.status === "published").length, "Journal articles"],
    [pubs.filter((p) => p.type === "Conference paper").length, "Conference contributions"],
    [events.length, "Training schools, meetings & visits"],
    [countries.size, "Countries for research training"]
  ];
  stats.forEach(([n, label]) => {
    const d = el("div", "stat");
    d.innerHTML = `<dt>${esc(label)}</dt><dd>${n}</dd>`;
    $("stats").appendChild(d);
  });
  const affil = [P.institution, P.group,
    ...(D.research || []).filter((r) => r.status === "active" && /\bEU\b|COST/.test(r.title + r.site + (r.tags || []).join(" ")))
      .map((r) => r.title.split(/\s[-—]\s/)[0] + (r.site ? ` · ${r.site}` : ""))];
  affil.filter(Boolean).forEach((a) => $("affiliations").appendChild(el("li", null, esc(a))));

  // ---------------------------------------------------------------- journey
  const journeyEl = $("journey-content");
  (D.journey || []).forEach((j) => {
    const li = el("li", "tl-item");
    const body = el("div", "tl-body");
    body.innerHTML = `
      <p class="tl-date mono">${esc(fmtDate(j.date))}</p>
      <h3 class="tl-title">${esc(j.title)}</h3>
      <p class="tl-place">${esc(j.place)}</p>
      ${j.description ? `<p class="tl-desc">${esc(j.description)}</p>` : ""}
      ${(j.roles || []).map((r) => `
        <div class="tl-role">
          <p class="tl-role-head"><span class="tl-role-title">${esc(r.title)}</span>${r.date ? `<span class="tl-role-date mono">${esc(fmtDate(r.date))}</span>` : ""}</p>
          ${r.place ? `<p class="tl-place">${esc(r.place)}</p>` : ""}
          ${r.description ? `<p class="tl-desc">${esc(r.description)}</p>` : ""}
        </div>`).join("")}`;
    const extras = [];
    if (j.grades) extras.push(`<li><span class="label mono">Grade</span><span>${esc(j.grades)}</span></li>`);
    if (j.awards) extras.push(`<li><span class="label mono">Award</span><span>${esc(j.awards)}</span></li>`);
    if (j.paper) {
      const p = typeof j.paper === "string" ? { title: j.paper } : j.paper;
      const t = p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title);
      extras.push(`<li><span class="label mono">Paper</span><span>${t}</span></li>`);
    }
    if (extras.length) body.appendChild(el("ul", "tl-extra", extras.join("")));
    li.appendChild(body);
    const photos = asList(j.photos || j.photo).filter(Boolean);
    if (photos.length) {
      const items = photos.map((src) => ({ src, caption: j.title }));
      li.appendChild(thumb(photos[0], j.title, items, 0, "tl-photo"));
      li.classList.add("has-photo");
    }
    journeyEl.appendChild(li);
  });

  // ---------------------------------------------------------------- research cards
  const researchEl = $("research-content");
  (D.research || []).forEach((r) => {
    const card = el("article", "card");
    const photos = asList(r.photos).filter(Boolean);
    if (photos.length) {
      const items = photos.map((src) => ({ src, caption: r.title }));
      const cover = thumb(photos[0], r.title, items, 0, "card-cover");
      if (photos.length > 1) cover.appendChild(el("span", "count mono", `1 / ${photos.length}`));
      card.appendChild(cover);
    } else {
      card.appendChild(el("div", "card-cover card-cover-empty", `<span class="mono">${esc((r.tags || [])[0] || "Research")}</span>`));
    }
    const body = el("div", "card-body");
    body.innerHTML = `
      <div class="card-top"><span class="card-badges">${statusTag(r.status)}${r.kind ? `<span class="kind">${esc(r.kind)}</span>` : ""}</span><span class="card-site mono">${esc(r.site)}</span></div>
      <h3 class="card-title">${esc(r.title)}</h3>
      ${r.description ? `<p class="card-desc">${esc(r.description)}</p>` : ""}
      ${r.link ? `<a class="card-link" href="${esc(r.link)}" target="_blank" rel="noopener">${esc(r.linkLabel || "Learn more")} →</a>` : ""}
      ${(r.tags || []).length ? `<div class="tags">${r.tags.map((t) => `<span class="tag mono">${esc(t)}</span>`).join("")}</div>` : ""}`;
    card.appendChild(body);
    researchEl.appendChild(card);
  });

  // ---------------------------------------------------------------- skills & toolkit
  const SK = D.skills || {};
  const STAGE_ICONS = [
    // acquire: drone
    '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="7" cy="8" r="4"/><circle cx="25" cy="8" r="4"/><path d="M10 10l4 4h4l4-4M12 14h8v6h-8zM16 20v4M12 27l4-3 4 3"/></svg>',
    // process: point cloud
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4l-7 11h4l-5 8h16l-5-8h4z"/><path d="M16 23v5"/><g class="dots"><circle cx="5" cy="6" r="1"/><circle cx="27" cy="9" r="1"/><circle cx="4" cy="19" r="1"/><circle cx="28" cy="20" r="1"/><circle cx="24" cy="27" r="1"/></g></svg>',
    // analyse: chart
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 5v22h22"/><path d="M9 21l5-6 4 3 7-9"/><circle cx="25" cy="9" r="1.6"/></svg>',
    // map
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 8l8-3 8 3 8-3v19l-8 3-8-3-8 3z"/><path d="M12 5v19M20 8v19"/></svg>'
  ];
  const pipeEl = $("pipeline");
  (SK.pipeline || []).forEach((st, i) => {
    const li = el("li", "stage");
    li.innerHTML = `
      <div class="stage-head">
        <span class="stage-icon">${STAGE_ICONS[i % STAGE_ICONS.length]}</span>
        <span class="stage-num mono">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <h3 class="stage-title">${esc(st.stage)}</h3>
      <p class="stage-sum">${esc(st.summary)}</p>
      <ul class="stage-methods">${(st.methods || []).map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
      <div class="stage-tools">${(st.tools || []).map((t) => `<span class="tool mono">${esc(t)}</span>`).join("")}</div>`;
    pipeEl.appendChild(li);
  });

  const certs = SK.certifications || [];
  $("cert-card").innerHTML = certs.length ? `<p class="card-label mono">Certification</p>` + certs.map((c) => `
    <div class="cert">
      <span class="cert-badge">${STAGE_ICONS[0]}</span>
      <div><p class="cert-name">${esc(c.name)}</p><p class="cert-issuer">${esc(c.issuer)}</p>${c.note ? `<p class="cert-note">${esc(c.note)}</p>` : ""}</div>
    </div>`).join("") : "";

  const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];
  $("lang-card").innerHTML = `<p class="card-label mono">Languages</p>` + (D.languages || []).map((l) => {
    const native = /native/i.test(l.level);
    const lvl = native ? CEFR.length : CEFR.indexOf(String(l.level).toUpperCase()) + 1;
    const bars = CEFR.map((c, i) => `<span class="seg${i < lvl ? " on" : ""}" title="${c}"></span>`).join("");
    return `
      <div class="lang">
        <div class="lang-top"><span class="lang-name">${esc(l.name)}</span><span class="lang-level mono">${esc(native ? "Native" : l.level)}</span></div>
        <div class="meter" role="img" aria-label="${esc(l.name)}: ${esc(l.level)}">${bars}</div>
        ${l.note ? `<p class="lang-note">${esc(l.note)}</p>` : ""}
      </div>`;
  }).join("") + `<p class="cefr-scale mono"><span>A1</span><span>C2</span></p>`;

  const courses = SK.courses || [];
  $("course-card").innerHTML = courses.length ? `<p class="card-label mono">Short courses</p><ul class="courses">` +
    courses.map((c) => `<li><span class="course-name">${esc(c.name)}</span><span class="course-meta mono">${esc([c.provider, c.year].filter(Boolean).join(" · "))}</span></li>`).join("") + `</ul>` : "";
  if (!courses.length) $("course-card").remove();
  if (!certs.length) $("cert-card").remove();

  // ---------------------------------------------------------------- publications
  const pubEl = $("publications-content");
  const order = ["Journal article", "Magazine article", "Conference paper"];
  const groups = {};
  pubs.forEach((p) => (groups[p.type || "Other"] = groups[p.type || "Other"] || []).push(p));
  const plural = (t) => (t.endsWith("s") ? t : t + "s");
  [...order.filter((t) => groups[t]), ...Object.keys(groups).filter((t) => !order.includes(t))].forEach((type) => {
    const list = groups[type].slice().sort((a, b) => sortKey(b.year).localeCompare(sortKey(a.year)));
    const g = el("div", "pub-group");
    g.appendChild(el("h3", "pub-group-title mono", `${esc(plural(type))} <span class="pub-count">${list.length}</span>`));
    const ol = el("ol", "pub-list");
    list.forEach((p) => {
      const li = el("li", "pub");
      const title = p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title);
      li.innerHTML = `
        <span class="pub-year mono">${esc(p.year)}</span>
        <div class="pub-main">
          <p class="pub-title">${title}</p>
          ${p.venue ? `<p class="pub-venue">${esc(p.venue)}</p>` : ""}
        </div>
        <div class="pub-side">
          ${p.status && p.status !== "published" ? statusTag(p.status) : ""}
          ${p.link ? `<a class="pub-doi mono" href="${esc(p.link)}" target="_blank" rel="noopener">${/doi\.org/.test(p.link) ? "DOI" : "Link"} ↗</a>` : ""}
        </div>`;
      ol.appendChild(li);
    });
    g.appendChild(ol);
    pubEl.appendChild(g);
  });

  // ---------------------------------------------------------------- conferences & trainings
  const evEl = $("trainings-content");
  events.forEach((c) => {
    const item = el("article", "event");
    const [mon, yr] = fmtDate(c.date).split(" ").length === 2 ? fmtDate(c.date).split(" ") : ["", c.date];
    item.appendChild(el("div", "event-date mono", `<span class="ev-mon">${esc(mon)}</span><span class="ev-yr">${esc(yr)}</span>`));
    const body = el("div", "event-body");
    body.innerHTML = `
      <p class="event-type mono">${esc(c.type)}</p>
      <h3 class="event-title">${esc(c.name)}</h3>
      <p class="event-meta">${esc(c.location)}${c.role ? ` <span class="dot">·</span> ${esc(c.role)}` : ""}</p>
      ${c.description ? `<p class="event-desc">${esc(c.description)}</p>` : ""}`;
    const row = photoRow(c.photos, c.name);
    if (row) body.appendChild(row);
    item.appendChild(body);
    evEl.appendChild(item);
  });

  // ---------------------------------------------------------------- field log
  const logEl = $("log-content");
  (D.fieldLog || []).forEach((l) => {
    const n = el("article", "note");
    n.innerHTML = `<p class="note-date mono">${esc(fmtDate(l.date))}</p><h3 class="note-title">${esc(l.title)}</h3><p class="note-text">${esc(l.note)}</p>`;
    const row = photoRow(l.photos, l.title);
    if (row) n.appendChild(row);
    logEl.appendChild(n);
  });

  // ---------------------------------------------------------------- masonry galleries (uncropped)
  function masonry(container, entries) {
    const items = entries.map((e) => ({ src: e.src, caption: e.lbCaption }));
    entries.forEach((e, i) => {
      const fig = el("figure", "m-item");
      fig.appendChild(thumb(e.src, e.lbCaption, items, i, "m-thumb"));
      fig.appendChild(el("figcaption", null, `<span class="m-title">${esc(e.title)}</span>${e.meta ? `<span class="m-meta mono">${esc(e.meta)}</span>` : ""}`));
      container.appendChild(fig);
    });
  }
  masonry($("gallery-content"), (D.gallery || []).filter((g) => g.image).map((g) => ({
    src: g.image, title: g.caption, meta: g.meta, lbCaption: [g.caption, g.meta].filter(Boolean).join(" - ")
  })));

  const travel = (D.travel || []).slice().sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
  const travelEntries = [];
  travel.forEach((t) => asList(t.photos).filter(Boolean).forEach((src) => travelEntries.push({
    src, title: t.location, meta: [fmtDate(t.date), t.note].filter(Boolean).join(" · "),
    lbCaption: `${t.location} - ${t.note || fmtDate(t.date)}`
  })));
  masonry($("travel-content"), travelEntries);

  // ---------------------------------------------------------------- contact + footer
  if (P.email) {
    const ce = $("contact-email");
    ce.href = `mailto:${P.email}`;
    ce.textContent = P.email;
  }
  profileLinks().filter((l) => l[2] !== "email").forEach(([label, href, icon]) => $("contact-content").appendChild(linkButton(label, href, icon)));
  $("footer-left").textContent = `© ${new Date().getFullYear()} ${P.name}` + (P.updated ? ` · Last updated ${fmtDate(P.updated)}` : "");

  // ---------------------------------------------------------------- nav: highlight current section
  const navLinks = Array.from(document.querySelectorAll("#nav-links a"));
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function setActive(id) {
    navLinks.forEach((a) => {
      const on = a.getAttribute("href") === "#" + id;
      a.classList.toggle("active", on);
      if (on && a.scrollIntoView && window.innerWidth < 900) {
        const bar = a.parentElement;
        bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2, behavior: "smooth" });
      }
    });
  }
  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
      const current = sections.find((s) => visible.get(s.id));
      if (current) setActive(current.id);
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }
})();
