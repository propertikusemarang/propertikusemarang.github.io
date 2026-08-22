(function () {
  "use strict";

  var WA_NUMBER = "6281215207380";


  var BASE_PATH = (typeof window.__TL_BASE__ === "string") ? window.__TL_BASE__ : (function () {
    var scriptEl = document.currentScript || document.querySelector('script[src*="main.js"]');
    if (!scriptEl) return "";
    var abs = new URL(scriptEl.getAttribute("src"), location.href).pathname; 
    var base = abs.replace(/js\/main\.js(\?.*)?$/, ""); 
    base = base.replace(/\/$/, ""); 
    return base;
  })();

  function withBase(logicalPath) {
    if (logicalPath === "/") return BASE_PATH === "" ? "/" : BASE_PATH + "/";
    return BASE_PATH + logicalPath;
  }

  function stripBase(rawPathname) {
    var p = rawPathname;
    if (BASE_PATH && p.indexOf(BASE_PATH) === 0) {
      p = p.slice(BASE_PATH.length);
    }
    if (p === "") p = "/";
    return p;
  }

  
  (function restoreDeepLink() {
    var saved = sessionStorage.getItem("tl_redirect_path");
    if (saved) {
      sessionStorage.removeItem("tl_redirect_path");
      if (saved !== location.pathname) {
        history.replaceState(null, "", saved);
      }
    }
  })();


  function parsePath(rawPath) {
    var path = rawPath.replace(/\/+$/, "");
    if (path === "" ) path = "/";
    return path;
  }

  // Cari 1 unit di dalam sebuah project berdasarkan slug project + slug unit
  function findProject(projectSlug) {
    return PROJECTS.filter(function (p) { return p.slug === projectSlug; })[0];
  }
  function findUnit(project, unitSlug) {
    if (!project) return null;
    return project.units.filter(function (u) { return u.slug === unitSlug; })[0];
  }

  function legacyProdukRedirect(oldSlug) {
    for (var i = 0; i < PROJECTS.length; i++) {
      var proj = PROJECTS[i];
      if (oldSlug === proj.slug && proj.units.length === 1) {
        return "/project/" + proj.slug;
      }
      if (oldSlug.indexOf(proj.slug + "-") === 0) {
        var suffix = oldSlug.slice(proj.slug.length + 1);
        var idx = parseInt(suffix, 10);
        if (!isNaN(idx) && proj.units[idx - 1]) {
          return "/project/" + proj.slug + "/" + proj.units[idx - 1].slug;
        }
      }
    }
    return null;
  }

  function matchRoute(path) {
    path = parsePath(path);
    if (path === "/" || path === "/beranda") return { page: "beranda" };
    if (path === "/tentang-kami") return { page: "tentang-kami" };
    if (path === "/produk") return { page: "produk" };
    if (path === "/kontak-kami") return { page: "kontak-kami" };

    // /project/{projectSlug}/{unitSlug} -> halaman detail 1 rumah
    var m2 = path.match(/^\/project\/([a-z0-9\-]+)\/([a-z0-9\-]+)$/i);
    if (m2) {
      var proj2 = findProject(m2[1]);
      var unit2 = findUnit(proj2, m2[2]);
      if (proj2 && unit2) return { page: "unit-detail", projectSlug: proj2.slug, unitSlug: unit2.slug };
      return { page: "404" };
    }

    // /project/{projectSlug} -> daftar unit (atau langsung ke detail kalau cuma 1 unit)
    var m1 = path.match(/^\/project\/([a-z0-9\-]+)$/i);
    if (m1) {
      var proj1 = findProject(m1[1]);
      if (!proj1) return { page: "404" };
      if (proj1.units.length > 1) return { page: "project-listing", projectSlug: proj1.slug };
      return { page: "unit-detail", projectSlug: proj1.slug, unitSlug: proj1.units[0].slug };
    }

    // Kompatibilitas mundur untuk link lama /produk/{slug}
    var mOld = path.match(/^\/produk\/([a-z0-9\-]+)$/i);
    if (mOld) {
      var target = legacyProdukRedirect(mOld[1]);
      if (target) return { page: "redirect", to: target };
      return { page: "404" };
    }

    return { page: "404" };
  }

  var TITLES = {
    "beranda": "TumbuhLand | Hunian dan Investasi Aman",
    "tentang-kami": "Tentang Kami — TumbuhLand",
    "produk": "Perumahan Kami — TumbuhLand",
    "project-listing": "%NAME% — TumbuhLand",
    "unit-detail": "%NAME% — TumbuhLand",
    "kontak-kami": "Kontak Kami — TumbuhLand",
    "404": "Halaman Tidak Ditemukan — TumbuhLand"
  };

  function render(path, opts) {
    opts = opts || {};
    var route = matchRoute(path);

    if (route.page === "redirect") {
      history.replaceState(null, "", withBase(route.to));
      render(route.to, opts);
      return;
    }

    document.querySelectorAll(".page").forEach(function (el) {
      el.classList.remove("is-active", "route-fade");
    });
    var target = document.querySelector('.page[data-page="' + route.page + '"]');
    if (!target) target = document.querySelector('.page[data-page="404"]');
    target.classList.add("is-active", "route-fade");

    if (route.page === "project-listing") {
      var proj = findProject(route.projectSlug);
      renderProjectListing(proj);
      document.title = TITLES["project-listing"].replace("%NAME%", proj.nama);
    } else if (route.page === "unit-detail") {
      var proj2 = findProject(route.projectSlug);
      var unit = findUnit(proj2, route.unitSlug);
      renderUnitDetail(proj2, unit);
      document.title = TITLES["unit-detail"].replace("%NAME%", unit.nama);
    } else {
      document.title = TITLES[route.page] || "TumbuhLand";
    }

    document.querySelectorAll("[data-route]").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("data-route") === route.page);
    });

    if (!opts.skipScroll) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    closeMobileNav();
    initRevealObserver();
  }

  function navigateTo(logicalPath, push) {
    if (push !== false) history.pushState(null, "", withBase(logicalPath));
    render(logicalPath);
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-link]");
    if (!link) return;
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) !== "/") return;
    e.preventDefault();
    navigateTo(href);
  });

  window.addEventListener("popstate", function () {
    render(stripBase(location.pathname));
  });

  function buildProductNav() {
    var dropdown = document.getElementById("productDropdown");
    var mobileSub = document.getElementById("mobileProductSub");
    var footerList = document.getElementById("footerProdukList");
    var select = document.getElementById("cfInterest");

    var ddHtml = "";
    var mobileHtml = "";
    var footerHtml = "";
    var selectHtml = '<option value="">Pilih project (opsional)</option>';

    PROJECTS.forEach(function (p) {
      var href = "/project/" + p.slug;
      ddHtml += '<li><a href="' + href + '" data-link>' + p.nama + '<span class="dd-location">' + p.lokasi + '</span></a></li>';
      mobileHtml += '<a href="' + href + '" data-link>' + p.nama + '</a>';
      footerHtml += '<li><a href="' + href + '" data-link>' + p.nama + '</a></li>';
      p.units.forEach(function (u) {
        selectHtml += '<option value="' + u.nama + '">' + u.nama + '</option>';
      });
    });
    ddHtml += '<li><a href="/produk" data-link style="color:var(--gold);font-weight:600;">Lihat Semua Perumahan →</a></li>';
    mobileHtml += '<a href="/produk" data-link style="color:var(--gold);">Lihat Semua →</a>';

    if (dropdown) dropdown.innerHTML = ddHtml;
    if (mobileSub) mobileSub.innerHTML = mobileHtml;
    if (footerList) footerList.innerHTML = footerHtml;
    if (select) select.innerHTML = selectHtml;
  }

  // ---- Helper: ambil 1 nilai spesifikasi berdasarkan label ----
  function getSpec(spesifikasi, label) {
    var found = (spesifikasi || []).filter(function (s) { return s.label === label; })[0];
    return found ? found.value : "";
  }
  // Ambil angka pertama dari string seperti "700 Juta-an" -> 700 (untuk dibandingkan/diurutkan)
  function parseHargaNumber(str) {
    var m = (str || "").match(/[\d.,]+/);
    if (!m) return null;
    return parseFloat(m[0].replace(/\./g, "").replace(",", "."));
  }
  // Cari harga termurah di antara semua unit sebuah project
  function cheapestHarga(project) {
    var best = null;
    project.units.forEach(function (u) {
      var h = getSpec(u.spesifikasi, "Harga");
      var n = parseHargaNumber(h);
      if (h && (best === null || (n !== null && n < best.n))) best = { label: h, n: n };
    });
    return best ? best.label : "";
  }

  var ICON_BED = '<svg viewBox="0 0 24 24" fill="none"><path d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18v2M21 18v2M3 12V8a2 2 0 012-2h4a2 2 0 012 2v2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_BATH = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM7 12V6a2 2 0 012-2h1M4 19v1M18 19v1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_AREA = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_HOME = '<svg viewBox="0 0 24 24" fill="none"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1v-9.5z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_PIN = '<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.3-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.7 12 21 12 21z" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.2" stroke-width="1.8"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_BOOKMARK = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12v17l-6-4-6 4V4z" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  // Card untuk sebuah PROJECT/cluster (dipakai di beranda & /produk)
  function productCardHTML(p) {
    var badgeText = p.units.length > 1 ? (p.units.length + ' Pilihan Unit') : 'Rumah Ready';
    var hargaTermurah = cheapestHarga(p);
    var tipeChip = getSpec(p.units[0].spesifikasi, "Tipe Unit");

    var chipsHtml = '<span class="pc-chip">' + ICON_HOME + (tipeChip ? ('Tipe ' + tipeChip) : 'Semi Cluster') + '</span>';
    if (p.units.length > 1) chipsHtml += '<span class="pc-chip">' + ICON_AREA + p.units.length + ' Unit Tersedia</span>';

    return (
      '<a class="perumahan-card reveal" href="/project/' + p.slug + '" data-link>' +
        '<div class="pc-media">' +
          '<img src="' + p.heroImage + '" alt="' + p.nama + '" loading="lazy">' +
          '<span class="pc-badge">' + badgeText + '</span>' +
          '<span class="pc-fav" aria-hidden="true">' + ICON_BOOKMARK + '</span>' +
        '</div>' +
        '<div class="pc-body">' +
          '<h3>' + p.nama + '</h3>' +
          '<div class="pc-loc">' + ICON_PIN + '<span>' + p.lokasi + '</span></div>' +
          '<div class="pc-meta">' + chipsHtml + '</div>' +
          '<div class="pc-foot">' +
            '<span class="pc-price"><small>Mulai dari</small><b>' + (hargaTermurah || 'Hubungi Kami') + '</b></span>' +
            '<span class="pc-arrow">' + ICON_ARROW + '</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  // Card untuk sebuah UNIT di dalam project (dipakai di halaman project-listing)
  function unitCardHTML(project, unit) {
    var tipe = getSpec(unit.spesifikasi, "Tipe Unit");
    var harga = getSpec(unit.spesifikasi, "Harga");
    var kt = getSpec(unit.spesifikasi, "Jumlah Kamar Tidur");
    var km = getSpec(unit.spesifikasi, "Jumlah Kamar Mandi");
    var luas = getSpec(unit.spesifikasi, "Luas Bangunan") || getSpec(unit.spesifikasi, "Luas Kavling");

    var chipsHtml = "";
    if (kt) chipsHtml += '<span class="pc-chip">' + ICON_BED + kt + '</span>';
    if (km) chipsHtml += '<span class="pc-chip">' + ICON_BATH + km + '</span>';
    if (luas) chipsHtml += '<span class="pc-chip">' + ICON_AREA + luas + '</span>';

    return (
      '<a class="perumahan-card reveal" href="/project/' + project.slug + '/' + unit.slug + '" data-link>' +
        '<div class="pc-media">' +
          '<img src="' + unit.heroImage + '" alt="' + unit.nama + '" loading="lazy">' +
          (tipe ? ('<span class="pc-badge">Tipe ' + tipe + '</span>') : "") +
          '<span class="pc-fav" aria-hidden="true">' + ICON_BOOKMARK + '</span>' +
        '</div>' +
        '<div class="pc-body">' +
          '<div class="eyebrow">' + (unit.subnama || project.nama) + '</div>' +
          '<h3>' + unit.nama + '</h3>' +
          '<div class="pc-meta">' + chipsHtml + '</div>' +
          '<div class="pc-foot">' +
            '<span class="pc-price"><small>Harga mulai</small><b>' + (harga || 'Hubungi Kami') + '</b></span>' +
            '<span class="pc-arrow">' + ICON_ARROW + '</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  function buildProductGrids() {
    var home = document.getElementById("homeProdukGrid");
    var list = document.getElementById("produkListGrid");
    var html = PROJECTS.map(productCardHTML).join("");
    if (home) home.innerHTML = html;
    if (list) list.innerHTML = html;
  }

  // Halaman: daftar unit di dalam 1 project (mis. Rumah Sadewa 1..5)
  function renderProjectListing(project) {
    var container = document.getElementById("projectListingContent");
    if (!project || !container) return;

    var gridHtml = project.units.map(function (u) { return unitCardHTML(project, u); }).join("");

    container.innerHTML =
      '<div class="page-hero">' +
        '<div class="container">' +
          '<div class="breadcrumb"><a href="/beranda" data-link>Beranda</a><span>/</span><a href="/produk" data-link>Produk</a><span>/</span>' + project.nama + '</div>' +
          '<h1>' + project.nama + '</h1>' +
          '<p>' + project.deskripsi + '</p>' +
          '<p>' + project.lokasi + '</p>' +
        '</div>' +
      '</div>' +
      '<section class="section">' +
        '<div class="container">' +
          '<div class="section-head reveal" style="margin-bottom:32px;"><div class="eyebrow">Pilihan Unit</div><h2>Pilih unit rumah yang sesuai kebutuhan Anda</h2></div>' +
          '<div class="perumahan-grid reveal-stagger reveal">' + gridHtml + '</div>' +
        '</div>' +
      '</section>';
  }

  function renderUnitDetail(project, p) {
    var container = document.getElementById("unitDetailContent");
    if (!p || !container || !project) return;

    var breadcrumbHtml = project.units.length > 1
      ? ('<a href="/beranda" data-link>Beranda</a><span>/</span><a href="/produk" data-link>Produk</a><span>/</span><a href="/project/' + project.slug + '" data-link>' + project.nama + '</a><span>/</span>' + p.nama)
      : ('<a href="/beranda" data-link>Beranda</a><span>/</span><a href="/produk" data-link>Produk</a><span>/</span>' + p.nama);

    var galleryHtml = p.images.map(function (src, i) {
      var badge = i === 7 ? '<span class="gallery-count">' + p.images.length + ' Foto</span>' : "";
      return '<a href="#" data-gallery-index="' + i + '"><img src="' + src + '" alt="Foto ' + (i + 1) + ' ' + p.nama + '" loading="lazy">' + badge + '</a>';
    }).join("");

    var mapOffset = p.images.length;
    var galleryMapHtml = (p.imagesMap || []).map(function (src, i) {
      var idx = mapOffset + i;
      return '<a href="#" class="gallery-single" data-gallery-index="' + idx + '"><img src="' + src + '" alt="Siteplan ' + p.nama + '" loading="lazy"></a>';
    }).join("");

    var mapSectionHtml = (p.imagesMap && p.imagesMap.length)
      ? ('<section class="section section--tight" id="pd-galeri-map">' +
          '<div class="container">' +
            '<div class="section-head reveal" style="margin-bottom:32px;"><div class="eyebrow">Galeri</div><h2>Kesempatan tidak datang dua kali, Kost Al Madina sisa 3 Unit</h2></div>' +
            galleryMapHtml +
          '</div>' +
        '</section>')
      : "";

    var akadOffset = mapOffset + (p.imagesMap ? p.imagesMap.length : 0);
    var galleryAkadHtml = (p.imagesAkad || []).map(function (src, i) {
      var idx = akadOffset + i;
      var badge = i === 7 ? '<span class="gallery-count">' + p.imagesAkad.length + ' Foto</span>' : "";
      return '<a href="#" data-gallery-index="' + idx + '"><img src="' + src + '" alt="Foto Akad ' + (i + 1) + ' ' + p.nama + '" loading="lazy">' + badge + '</a>';
    }).join("");

    var akadSectionHtml = (p.imagesAkad && p.imagesAkad.length)
      ? ('<section class="section section--tight" id="pd-galeri-akad">' +
          '<div class="container">' +
            '<div class="section-head reveal" style="margin-bottom:32px;"><div class="eyebrow">Galeri</div><h2>Terimakasih atas kepercayaan Bapak Ibu Pilihan tepat berinvestasi</h2></div>' +
            '<div class="gallery-grid reveal">' + galleryAkadHtml + '</div>' +
          '</div>' +
        '</section>')
      : "";

    var specHtml = p.spesifikasi.map(function (s) {
      return '<div class="spec-row"><dt>' + s.label + '</dt><dd>' + s.value + '</dd></div>';
    }).join("");

    var facilityHtml = p.fasilitas.map(function (f) {
      return '<div class="facility-item"><svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' + f + '</div>';
    }).join("");

    var waText = encodeURIComponent("Halo TumbuhLand, saya tertarik dengan " + p.nama + " (" + p.lokasi + "). Bisa dibantu info lebih lanjut?");

    container.innerHTML =
      '<div class="pd-hero">' +
        '<img src="' + p.heroImage + '" alt="' + p.nama + '">' +
        '<div class="pd-hero-content"><div class="container">' +
          '<div class="breadcrumb" style="color:var(--muted-on-dark);">' + breadcrumbHtml + '</div>' +
          '<h1>' + p.nama + '</h1>' +
          '<div class="pd-loc"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.3-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.7 12 21 12 21z" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.2" stroke-width="1.6"/></svg>' + project.lokasi + '</div>' +
        '</div></div>' +
      '</div>' +

      '<div class="pd-tabs">' +
        '<button type="button" data-tab-target="#pd-galeri" class="is-active">Galeri Foto</button>' +
        '<button type="button" data-tab-target="#pd-spesifikasi">Spesifikasi</button>' +
        '<button type="button" data-tab-target="#pd-fasilitas">Lokasi &amp; Fasilitas</button>' +
        '<button type="button" data-tab-target="#pd-marketing">Kontak Marketing</button>' +
      '</div>' +

      '<section class="section section--tight" id="pd-galeri">' +
        '<div class="container">' +
          '<div class="section-head reveal" style="margin-bottom:32px;"><div class="eyebrow">Galeri</div><h2>Lihat Lebih Dekat ' + p.nama + '</h2></div>' +
          '<div class="gallery-grid reveal">' + galleryHtml + '</div>' +
        '</div>' +
      '</section>' +

      mapSectionHtml +

      akadSectionHtml +

      '<section class="section section--tight" id="pd-spesifikasi" style="background:var(--cream-2);">' +
        '<div class="container">' +
          '<div class="spec-wrap">' +
            '<div class="reveal">' +
              '<div class="eyebrow">Tentang Kawasan</div>' +
              '<h2 style="font-size:28px;margin-bottom:18px;">' + p.tagline + '</h2>' +
              '<p style="color:var(--muted-on-light);font-size:15.5px;line-height:1.8;">' + p.deskripsi + '</p>' +
            '</div>' +
            '<div class="reveal">' +
              '<h4 style="font-size:16px;margin-bottom:6px;color:var(--gold-deep);">Spesifikasi Detail</h4>' +
              '<dl class="spec-list">' + specHtml + '</dl>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section section--tight" id="pd-fasilitas">' +
        '<div class="container">' +
          '<div class="section-head reveal" style="margin-bottom:32px;"><div class="eyebrow">Fasilitas Kawasan</div><h2>Fasilitas yang tersedia di ' + p.nama + '</h2></div>' +
          '<div class="facility-grid reveal">' + facilityHtml + '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section section--tight" id="pd-marketing" style="background:var(--cream-2);">' +
        '<div class="container">' +
          '<div class="spec-wrap">' +
            '<div class="reveal">' +
              '<div class="eyebrow">Kontak Marketing</div>' +
              '<h2 style="font-size:28px;margin-bottom:14px;">Tertarik dengan ' + p.nama + '?</h2>' +
              '<p style="color:var(--muted-on-light);font-size:15.5px;">Hubungi langsung tim marketing kami untuk jadwal survei lokasi, simulasi KPR, atau pertanyaan lainnya seputar ' + p.nama + '.</p>' +
            '</div>' +
            '<div class="reveal">' +
              '<div class="marketing-card">' +
                '<div class="eyebrow">Marketing Kawasan</div>' +
                '<h4>' + p.nama + '</h4>' +
                '<div class="marketing-person">' +
                '</div>' +
                '<div class="marketing-actions">' +
                  '<a class="btn btn-primary" href="https://wa.me/6281215207380' + p.marketing.whatsapp + '?text=' + waText + '" target="_blank" rel="noopener">Chat via WhatsApp</a>' +
                  '<a class="btn btn-outline on-dark-btn" href="tel:' + p.marketing.telepon.replace(/\s/g, "") + '">Telepon: ' + p.marketing.telepon + '</a>' +
                  '<a class="btn-ghost" style="color:var(--cream);border-color:var(--muted-on-dark);text-align:center;" href="mailto:' + p.marketing.email + '">' + p.marketing.email + '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    setupTabs();
    setupGallery(p.images.concat(p.imagesMap || [], p.imagesAkad || []), p.nama);
  }

  function setupTabs() {
    var buttons = document.querySelectorAll(".pd-tabs button");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var target = document.querySelector(btn.getAttribute("data-tab-target"));
        if (target) {
          var offset = 140;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }


  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCounter = document.getElementById("lightboxCounter");
  var galleryImages = [];
  var galleryTitle = "";
  var galleryIndex = 0;

  function setupGallery(images, title) {
    galleryImages = images;
    galleryTitle = title;
    document.querySelectorAll("[data-gallery-index]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(parseInt(a.getAttribute("data-gallery-index"), 10));
      });
    });
  }

  function openLightbox(index) {
    galleryIndex = index;
    updateLightbox();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function updateLightbox() {
    lightboxImg.src = galleryImages[galleryIndex];
    lightboxImg.alt = galleryTitle + " — foto " + (galleryIndex + 1);
    lightboxCounter.textContent = (galleryIndex + 1) + " / " + galleryImages.length;
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", function () {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    updateLightbox();
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
    if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
  });

  var header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }, { passive: true });

  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var navScrim = document.getElementById("navScrim");

  function openMobileNav() {
    navToggle.classList.add("is-open");
    mobileNav.classList.add("is-open");
    navScrim.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMobileNav() {
    navToggle.classList.remove("is-open");
    mobileNav.classList.remove("is-open");
    navScrim.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  navToggle.addEventListener("click", function () {
    mobileNav.classList.contains("is-open") ? closeMobileNav() : openMobileNav();
  });
  navScrim.addEventListener("click", closeMobileNav);

  var mobileProductToggle = document.getElementById("mobileProductToggle");
  var mobileProductSub = document.getElementById("mobileProductSub");
  mobileProductToggle.addEventListener("click", function () {
    mobileProductSub.classList.toggle("is-open");
  });

  // Desktop dropdown: keyboard/tap support (in addition to CSS :hover)
  var productNavItem = document.getElementById("productNavItem");
  var productNavBtn = productNavItem.querySelector("button.nav-link");
  productNavBtn.addEventListener("click", function () {
    var open = productNavItem.classList.toggle("is-open");
    productNavBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) {
    if (!productNavItem.contains(e.target)) {
      productNavItem.classList.remove("is-open");
      productNavBtn.setAttribute("aria-expanded", "false");
    }
  });


  var revealObserver = null;
  function initRevealObserver() {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll(".page.is-active .reveal, .page.is-active .reveal-stagger").forEach(function (el) {
      revealObserver.observe(el);
    });
  }


  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cfName").value.trim();
      var phone = document.getElementById("cfPhone").value.trim();
      var interest = document.getElementById("cfInterest").value;
      var message = document.getElementById("cfMessage").value.trim();

      if (!name || !phone) {
        document.getElementById("cfName").reportValidity();
        return;
      }

      var text = "Halo TumbuhLand, saya " + name + " (" + phone + ").";
      if (interest) text += " Saya tertarik dengan " + interest + ".";
      if (message) text += " Pesan: " + message;

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");

      var success = document.getElementById("formSuccess");
      success.classList.add("is-shown");
      contactForm.reset();
    });
  }


  document.getElementById("yearNow").textContent = new Date().getFullYear();
  buildProductNav();
  buildProductGrids();
  render(stripBase(location.pathname), { skipScroll: true });
})();
