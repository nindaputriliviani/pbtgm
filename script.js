'use strict';

/* =========================================================
   PENGATURAN: ubah bagian ini sesuai sekolahmu.
   Semua data di bawah adalah contoh (placeholder).
   ========================================================= */
const CONFIG = {
  sekolah: 'SMK N TENGARAN',
  tahunAjaran: '2026/2027',
  batasDaftar: '2026-10-02', // format: TTTT-BB-HH
  biayaSingkat: 'Gratis',
  biaya: 'Pendaftaran gratis. Kamu hanya perlu menyiapkan perlengkapan pribadi (lihat info tiap ekskul).',
  syarat: [
    'Siswa aktif kelas X, XI, atau XII.',
    'Mendapat izin orang tua atau wali.',
    'Maksimal 2 ekskul: satu pilihan utama dan satu pilihan kedua.',
    'Band dan Robotik dapat mengadakan seleksi singkat di pertemuan pertama.'
  ],
  kontak: {
    nama: 'Kak Rina (Pembina OSIS)',
    wa: '0812-3456-7890',
    email: 'ekskul@smkntengaran.sch.id',
    lokasi: 'Ruang OSIS, lantai 1 (jam istirahat)'
  }
};

const MAKS_EKSKUL = 2; // form menyediakan 2 pilihan: utama + kedua

/* `terisi` = jumlah siswa yang sudah mendaftar sebelum halaman ini dipakai.
   Kuota juga berkurang otomatis setiap ada pendaftar baru di browser ini. */
const EKSKUL = [
  { id: 'pramuka', nama: 'Pramuka', ikon: '⛺', hari: ['Jumat'], jam: '14.30–16.30', tempat: 'Lapangan utama', pembina: 'Pak Sutrisno', kuota: 40, terisi: 31,
    bawa: 'Seragam pramuka lengkap dan buku catatan',
    deskripsi: 'Belajar kepemimpinan, survival, dan kerja sama tim lewat kegiatan di alam terbuka.',
    alias: ['pramuka', 'tunas kelapa'] },
  { id: 'pmr', nama: 'PMR', ikon: '🩺', hari: ['Rabu'], jam: '14.30–16.00', tempat: 'Ruang UKS', pembina: 'Bu Anindya', kuota: 25, terisi: 19,
    bawa: 'Seragam PMR dan alat tulis',
    deskripsi: 'Latihan pertolongan pertama, donor darah remaja, dan kegiatan kesehatan sekolah.',
    alias: ['pmr', 'palang merah', 'palang merah remaja'] },
  { id: 'paskibra', nama: 'Paskibra', ikon: '🚩', hari: ['Selasa', 'Kamis'], jam: '15.00–17.00', tempat: 'Lapangan upacara', pembina: 'Pak Hendra', kuota: 30, terisi: 22,
    bawa: 'Pakaian olahraga dan sepatu tertutup',
    deskripsi: 'Latihan baris-berbaris dan pengibaran bendera untuk upacara sekolah dan lomba.',
    alias: ['paskibra', 'paskibraka', 'pengibar bendera'] },
  { id: 'basket', nama: 'Volly', ikon: '🏀', hari: ['Senin', 'Rabu'], jam: '15.00–17.00', tempat: 'GOR sekolah', pembina: 'Pak Bayu', kuota: 25, terisi: 25,
    bawa: 'Pakaian olahraga, sepatu basket, botol minum',
    deskripsi: 'Latihan teknik dasar, strategi tim, dan persiapan turnamen antarsekolah.',
    alias: ['basket', 'basketball'] },
  { id: 'futsal', nama: 'Futsal', ikon: '⚽', hari: ['Selasa'], jam: '15.00–17.00', tempat: 'Lapangan futsal', pembina: 'Pak Rizal', kuota: 25, terisi: 23,
    bawa: 'Pakaian olahraga, sepatu futsal, pelindung tulang kering',
    deskripsi: 'Latihan rutin dan pertandingan persahabatan untuk putra dan putri.',
    alias: ['futsal'] },
  { id: 'band', nama: 'DrumBand', ikon: '🎸', hari: ['Rabu'], jam: '15.00–17.00', tempat: 'Studio musik', pembina: 'Bu Melati', kuota: 20, terisi: 12,
    bawa: 'Alat musik pribadi kalau ada (studio menyediakan drum dan amplifier)',
    deskripsi: 'Bermain musik bersama, dari gitar, bass, drum, keyboard, hingga vokal.',
    alias: ['band'] },
  { id: 'tari', nama: 'Tari Tradisional', ikon: '💃', hari: ['Sabtu'], jam: '08.00–10.00', tempat: 'Aula sekolah', pembina: 'Bu Sekar', kuota: 25, terisi: 14,
    bawa: 'Pakaian latihan yang nyaman dan selendang',
    deskripsi: 'Belajar tari daerah dan tampil di acara sekolah serta festival.',
    alias: ['tari', 'menari', 'tari tradisional', 'tarian'] },
  { id: 'robotik', nama: 'Rohis', ikon: '🤖', hari: ['Kamis'], jam: '14.30–16.30', tempat: 'Lab komputer', pembina: 'Pak Dimas', kuota: 20, terisi: 16,
    bawa: 'Laptop pribadi kalau ada (lab menyediakan komputer)',
    deskripsi: 'Merakit dan memprogram robot, dengan dasar elektronik dan pemrograman.',
    alias: ['robotik', 'robot', 'robotika'] },
  { id: 'jurnalistik', nama: 'Jurnalistik', ikon: '✍️', hari: ['Senin'], jam: '14.30–16.00', tempat: 'Perpustakaan', pembina: 'Bu Laras', kuota: 20, terisi: 9,
    bawa: 'Buku catatan dan HP untuk memotret',
    deskripsi: 'Menulis berita, mengelola mading dan media sekolah, belajar wawancara dan fotografi.',
    alias: ['jurnalistik', 'jurnalis', 'mading'] },
  { id: 'english', nama: 'Bahasa Jepang', ikon: '🗣️', hari: ['Jumat'], jam: '14.00–15.30', tempat: 'Ruang bahasa', pembina: 'Bu Kirana', kuota: 30, terisi: 17,
    bawa: 'Buku catatan',
    deskripsi: 'Latihan speaking, debat, dan permainan bahasa dalam suasana santai.',
    alias: ['Bahasa Jepang', 'english', 'klub bahasa inggris'] }
];

/* Kata kunci minat untuk fitur "bantu pilih ekskul" di chatbot */
const MINAT = [
  { kw: ['olahraga', 'sport', 'atlet', 'bola', 'fisik', 'sehat'], ids: ['basket', 'futsal'] },
  { kw: ['seni', 'panggung', 'tampil', 'perform'], ids: ['tari', 'band'] },
  { kw: ['musik', 'nyanyi', 'menyanyi', 'gitar', 'drum', 'vokal', 'lagu'], ids: ['band'] },
  { kw: ['teknologi', 'coding', 'komputer', 'program', 'programming', 'elektronik', 'sains'], ids: ['robotik'] },
  { kw: ['sosial', 'relawan', 'menolong', 'kesehatan', 'p3k', 'alam', 'kemah', 'camping', 'outdoor', 'petualangan'], ids: ['pmr', 'pramuka'] },
  { kw: ['kepemimpinan', 'pemimpin', 'disiplin', 'baris', 'upacara', 'bendera', 'organisasi'], ids: ['paskibra', 'pramuka'] },
  { kw: ['bahasa', 'inggris', 'speaking', 'debat'], ids: ['english'] },
  { kw: ['menulis', 'nulis', 'berita', 'wartawan', 'fotografi', 'foto', 'reporter', 'kamera'], ids: ['jurnalistik'] }
];

/* =========================================================
   UTILITAS
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = id => EKSKUL.find(e => e.id === id);
const jadwalStr = e => `${e.hari.join(' & ')}, ${e.jam}`;
const fmtTanggal = d => new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(d);
const deadlineDate = () => new Date(CONFIG.batasDaftar + 'T23:59:59');
const prefersReducedMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.matchMedia && matchMedia('(max-width: 980px)').matches;

/* Penyimpanan lokal (demo). Untuk sekolah sungguhan, kirim data ke server. */
const STORE_KEY = 'ekskul.pendaftaran.v1';
function loadRegs() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (_) { return []; }
}
function saveRegs(list) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); return true; } catch (_) { return false; }
}

function sisaKuota(e, regs = loadRegs()) {
  const terpakai = regs.filter(r => r.pilihan1 === e.id).length;
  return Math.max(0, e.kuota - e.terisi - terpakai);
}

/* Elemen utama (diisi saat init) */
let form, chatEl, chatLog, chatText;

/* =========================================================
   FORMULIR
   ========================================================= */
const REQUIRED = ['nama', 'nis', 'kelas', 'rombel', 'gender', 'lahir', 'wa', 'pilihan1', 'alasan', 'wali', 'waliHp', 'setuju'];
const phoneRe = /^(?:\+62|62|0)8[1-9]\d{7,11}$/;
const cleanPhone = v => v.replace(/[\s-]/g, '');

function val(name) {
  const el = form.elements[name];
  if (!el) return '';
  if (el instanceof HTMLInputElement && el.type === 'checkbox') return el.checked;
  return (el.value || '').trim();
}

const rules = {
  nama(v) {
    if (!v) return 'Isi nama lengkapmu.';
    if (v.length < 3) return 'Nama minimal 3 huruf.';
    if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) return 'Nama hanya boleh berisi huruf, spasi, titik, atau apostrof.';
    return '';
  },
  nis(v) {
    if (!v) return 'Isi NIS-mu.';
    if (!/^\d{5,12}$/.test(v)) return 'NIS terdiri dari 5–12 angka, tanpa spasi.';
    if (loadRegs().some(r => r.nis === v)) return 'NIS ini sudah terdaftar. Hubungi pembina jika ingin mengubah data.';
    return '';
  },
  kelas: v => (v ? '' : 'Pilih tingkat kelasmu.'),
  rombel(v) {
    if (!v) return 'Isi jurusan atau rombelmu, misalnya IPA 2.';
    return v.length > 20 ? 'Maksimal 20 karakter.' : '';
  },
  gender: v => (v ? '' : 'Pilih jenis kelamin.'),
  lahir(v) {
    if (!v) return 'Isi tanggal lahirmu.';
    const d = new Date(v), now = new Date();
    if (isNaN(d) || d > now) return 'Tanggal lahir tidak valid.';
    let umur = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) umur--;
    return umur < 11 || umur > 21 ? 'Usia harus antara 11 dan 21 tahun.' : '';
  },
  wa(v) {
    if (!v) return 'Isi nomor WhatsApp yang aktif.';
    return phoneRe.test(cleanPhone(v)) ? '' : 'Nomor belum valid. Contoh: 0812 3456 7890.';
  },
  email(v) {
    if (!v) return '';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Format email belum benar. Contoh: nama@email.com';
  },
  pilihan1: v => (v ? '' : 'Pilih satu ekskul utama.'),
  pilihan2: v => (v && v === val('pilihan1') ? 'Pilihan kedua tidak boleh sama dengan pilihan utama.' : ''),
  alasan(v) {
    if (!v) return 'Ceritakan alasanmu ikut ekskul ini.';
    return v.length < 20 ? `Tulis minimal 20 karakter (sekarang ${v.length}).` : '';
  },
  wali(v) {
    if (!v) return 'Isi nama orang tua atau wali.';
    return v.length < 3 ? 'Nama minimal 3 huruf.' : '';
  },
  waliHp(v) {
    if (!v) return 'Isi nomor HP orang tua atau wali.';
    return phoneRe.test(cleanPhone(v)) ? '' : 'Nomor belum valid. Contoh: 0812 3456 7890.';
  },
  setuju: v => (v ? '' : 'Centang pernyataan ini untuk melanjutkan.')
};

function setError(name, msg) {
  const box = form.querySelector(`[data-field="${name}"]`);
  if (!box) return;
  const err = box.querySelector('.err');
  if (err) err.textContent = msg;
  box.classList.toggle('has-error', !!msg);
  box.querySelectorAll('input, select, textarea').forEach(el => {
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
  });
}

function validateField(name) {
  if (!rules[name]) return '';
  const msg = rules[name](val(name));
  setError(name, msg);
  return msg;
}

function validateAll() {
  return Object.keys(rules).filter(n => validateField(n));
}

function focusField(name) {
  const box = form.querySelector(`[data-field="${name}"]`);
  if (!box) return;
  const el = box.querySelector('input:not(:disabled), select, textarea');
  box.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  if (el) el.focus({ preventScroll: true });
}

function updateProgress() {
  const done = REQUIRED.filter(n => {
    const v = val(n);
    return v === true || (typeof v === 'string' && v !== '');
  }).length;
  const pct = Math.round((done / REQUIRED.length) * 100);
  $('#progressBar').style.width = pct + '%';
  $('#progressPct').textContent = pct + '%';
  $('#progressLabel').textContent = `${done} dari ${REQUIRED.length} kolom wajib terisi`;
  $('.track').setAttribute('aria-valuenow', pct);
}

function updateCount() {
  $('#alasanCount').textContent = `${form.elements.alasan.value.length}/300`;
}

function renderTiles() {
  const regs = loadRegs();
  $('#ekskulGrid').innerHTML = EKSKUL.map(e => {
    const sisa = sisaKuota(e, regs);
    const penuh = sisa <= 0;
    const persen = Math.min(100, Math.round(((e.kuota - sisa) / e.kuota) * 100));
    const label = penuh ? 'Kuota penuh' : sisa <= 3 ? `Tinggal ${sisa} kursi` : `Sisa ${sisa} kursi`;
    return `
      <label class="tile ${penuh ? 'is-full' : ''}">
        <input type="radio" name="pilihan1" value="${e.id}" ${penuh ? 'disabled' : ''}>
        <span class="tile-body">
          <span class="tile-ikon" aria-hidden="true">${e.ikon}</span>
          <span class="tile-nama">${esc(e.nama)}</span>
          <span class="tile-jadwal">${esc(jadwalStr(e))}</span>
          <span class="cap" aria-hidden="true"><i style="width:${persen}%"></i></span>
          <span class="tile-kuota ${!penuh && sisa <= 3 ? 'low' : ''}">${label}</span>
        </span>
      </label>`;
  }).join('');
}

function renderPilihan2() {
  const sel = form.elements.pilihan2;
  const cur = sel.value;
  const p1 = val('pilihan1');
  const regs = loadRegs();
  sel.innerHTML = '<option value="">Tidak ada</option>' + EKSKUL.map(e => {
    const penuh = sisaKuota(e, regs) <= 0;
    const nonaktif = e.id === p1 || penuh;
    return `<option value="${e.id}" ${nonaktif ? 'disabled' : ''}>${esc(e.nama)}${penuh ? ' (penuh)' : ''}</option>`;
  }).join('');
  if (cur && cur !== p1) sel.value = cur;
}

function updateBentrok() {
  const a = byId(val('pilihan1')), b = byId(val('pilihan2'));
  const hint = $('#hintPilihan2');
  if (a && b) {
    const sama = a.hari.filter(h => b.hari.includes(h));
    hint.textContent = sama.length
      ? `Perhatian: ${a.nama} dan ${b.nama} sama-sama berlangsung hari ${sama.join(' & ')}. Cek jamnya agar tidak bentrok.`
      : 'Jadwal kedua ekskul ini tidak bertabrakan.';
  } else {
    hint.textContent = 'Opsional. Boleh dikosongkan.';
  }
}

function resetFormUI() {
  form.querySelectorAll('.field').forEach(f => {
    f.classList.remove('has-error');
    const err = f.querySelector('.err');
    if (err) err.textContent = '';
    f.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  });
  renderTiles();
  renderPilihan2();
  updateBentrok();
  updateCount();
  updateProgress();
  $('#formStatus').textContent = '';
}

function bindForm() {
  form.addEventListener('focusout', e => {
    const n = e.target.name;
    if (n && rules[n] && n !== 'pilihan1' && n !== 'gender') validateField(n);
  });

  form.addEventListener('input', e => {
    const n = e.target.name;
    if (n === 'alasan') updateCount();
    const box = n && form.querySelector(`[data-field="${n}"]`);
    if (box && box.classList.contains('has-error')) validateField(n);
    updateProgress();
  });

  form.addEventListener('change', e => {
    const n = e.target.name;
    if (n === 'pilihan1') {
      renderPilihan2();
      validateField('pilihan1');
      validateField('pilihan2');
    }
    if (n === 'pilihan1' || n === 'pilihan2') updateBentrok();
    if (n === 'gender' || n === 'setuju') validateField(n);
    updateProgress();
  });

  form.addEventListener('reset', () => setTimeout(resetFormUI, 0));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = $('#formStatus');
    const salah = validateAll();
    if (salah.length) {
      status.textContent = `Ada ${salah.length} kolom yang perlu diperbaiki.`;
      status.className = 'status status-err';
      focusField(salah[0]);
      return;
    }
    status.textContent = '';
    status.className = 'status';

    const regs = loadRegs();
    const rec = {
      no: `EKS-${new Date().getFullYear()}-${String(regs.length + 1).padStart(4, '0')}`,
      waktu: new Date().toISOString(),
      nama: val('nama'),
      nis: val('nis'),
      kelas: `${val('kelas')} ${val('rombel')}`,
      gender: val('gender'),
      lahir: val('lahir'),
      wa: cleanPhone(val('wa')),
      email: val('email'),
      pilihan1: val('pilihan1'),
      pilihan2: val('pilihan2'),
      alasan: val('alasan'),
      pengalaman: val('pengalaman'),
      wali: val('wali'),
      waliHp: cleanPhone(val('waliHp')),
      kesehatan: val('kesehatan')
    };

    /* TODO (opsional): kirim ke server / Google Apps Script di sini, misalnya:
       fetch('URL_SERVER_KAMU', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec) }); */

    regs.push(rec);
    if (!saveRegs(regs)) {
      status.textContent = 'Data tidak bisa disimpan di browser ini. Coba nonaktifkan mode privat lalu kirim ulang.';
      status.className = 'status status-err';
      return;
    }
    showReceipt(rec);
    botSay({
      html: `Pendaftaranmu tercatat dengan nomor ${bold(rec.no)}. Selamat bergabung di ${bold(byId(rec.pilihan1).nama)}! Jangan lupa tunjukkan bukti ke pembina di pertemuan pertama.`
    }, 300);
  });
}

function showReceipt(r) {
  const p1 = byId(r.pilihan1), p2 = r.pilihan2 ? byId(r.pilihan2) : null;
  $('#rNo').textContent = r.no;
  $('#rNama').textContent = r.nama;
  $('#rNis').textContent = r.nis;
  $('#rKelas').textContent = r.kelas;
  $('#rP1').textContent = `${p1.nama} (${jadwalStr(p1)})`;
  $('#rP2').textContent = p2 ? `${p2.nama} (${jadwalStr(p2)})` : '-';
  $('#rWaktu').textContent = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(r.waktu));
  const dlg = $('#receipt');
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
}

function initReceipt() {
  const dlg = $('#receipt');
  $('#btnPrint').addEventListener('click', () => window.print());
  $('#btnClose').addEventListener('click', () => (dlg.close ? dlg.close() : dlg.removeAttribute('open')));
  dlg.addEventListener('close', () => {
    form.reset();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}

/* =========================================================
   CHATBOT (berbasis aturan, tanpa server)
   ========================================================= */
const bold = s => `<b>${esc(s)}</b>`;
const pilihBtn = e => ({ label: `Pilih ${e.nama}`, pilih: e.id, primary: true });
const tanyaBtn = (label, text = label) => ({ label, tanya: text });

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/* kata kunci biasa = cocok per kata utuh; awalan "~" = cocok sebagai potongan kata */
function hasKw(t, kw) {
  if (kw[0] === '~') return t.includes(kw.slice(1));
  return (' ' + t + ' ').includes(' ' + kw + ' ');
}

function matchEkskul(t) {
  return EKSKUL.filter(e => e.alias.some(a => hasKw(t, a)));
}

function matchMinat(t) {
  const ids = [];
  MINAT.forEach(m => {
    if (m.kw.some(k => hasKw(t, k))) m.ids.forEach(id => { if (!ids.includes(id)) ids.push(id); });
  });
  return ids.slice(0, 3);
}

/* ---------- Jawaban ---------- */
function ekskulDetail(e) {
  const s = sisaKuota(e);
  return {
    html: `${e.ikon} ${bold(e.nama)}<br>${esc(e.deskripsi)}<br><br>` +
      `<b>Jadwal:</b> ${esc(jadwalStr(e))}<br>` +
      `<b>Tempat:</b> ${esc(e.tempat)}<br>` +
      `<b>Pembina:</b> ${esc(e.pembina)}<br>` +
      `<b>Perlu dibawa:</b> ${esc(e.bawa)}<br>` +
      `<b>Kursi:</b> ${s > 0 ? `sisa ${s} dari ${e.kuota}` : 'penuh'}`,
    actions: s > 0 ? [pilihBtn(e), tanyaBtn('Ekskul lain', 'daftar ekskul')] : [tanyaBtn('Lihat ekskul lain', 'daftar ekskul')]
  };
}

function bandingkan(list) {
  const items = list.map(e => {
    const s = sisaKuota(e);
    return `<li>${e.ikon} ${bold(e.nama)}, ${esc(jadwalStr(e))} <span class="tag ${s <= 0 ? 'tag-full' : ''}">${s > 0 ? 'sisa ' + s : 'penuh'}</span></li>`;
  }).join('');
  return {
    html: `Ini info singkatnya:<ul>${items}</ul>Sebut satu nama ekskul untuk info lengkap.`,
    actions: list.filter(e => sisaKuota(e) > 0).map(pilihBtn)
  };
}

function listAnswer(intro) {
  const items = EKSKUL.map(e => {
    const s = sisaKuota(e);
    return `<li>${e.ikon} ${bold(e.nama)}, ${esc(jadwalStr(e))} <span class="tag ${s <= 0 ? 'tag-full' : ''}">${s > 0 ? 'sisa ' + s : 'penuh'}</span></li>`;
  }).join('');
  return {
    html: `${intro}<ul>${items}</ul>Sebut nama ekskulnya kalau mau info lengkap.`,
    actions: [tanyaBtn('Bantu pilih ekskul', 'bantu pilih ekskul')]
  };
}

function rekomendasi(ids) {
  const list = ids.map(byId);
  const items = list.map(e => {
    const penuh = sisaKuota(e) <= 0;
    return `<li>${e.ikon} ${bold(e.nama)}, ${esc(jadwalStr(e))}${penuh ? ' <span class="tag tag-full">penuh</span>' : ''}</li>`;
  }).join('');
  return {
    html: `Berdasarkan minatmu, ini yang cocok:<ul>${items}</ul>Mau langsung kupilihkan di formulir?`,
    actions: list.filter(e => sisaKuota(e) > 0).map(pilihBtn).concat(tanyaBtn('Lihat semua', 'daftar ekskul'))
  };
}

function tanyaMinat() {
  return {
    html: 'Boleh. Kamu lebih tertarik ke bidang yang mana?',
    actions: ['Olahraga', 'Seni & musik', 'Teknologi', 'Sosial & kepemimpinan', 'Bahasa & menulis'].map(l => tanyaBtn(l))
  };
}

function jawabBatas() {
  const d = deadlineDate(), now = new Date();
  const tgl = fmtTanggal(d);
  if (now > d) return { html: `Pendaftaran sudah ditutup pada ${bold(tgl)}. Hubungi pembina kalau kamu masih ingin bergabung.`, actions: [tanyaBtn('Kontak pembina', 'kontak')] };
  if (now.toDateString() === d.toDateString()) return { html: `Pendaftaran ditutup ${bold('hari ini')} (${esc(tgl)}). Yuk selesaikan formulirnya sekarang.` };
  const hari = Math.ceil((d - now) / 86400000);
  return { html: `Pendaftaran ditutup pada ${bold(tgl)}, sekitar ${bold(hari + ' hari lagi')}.` };
}

const INTENTS = [
  { kw: ['syarat', 'persyaratan', 'ketentuan', 'boleh ikut', 'seleksi', 'audisi', 'tes', 'kelas berapa'],
    run: () => ({ html: `Syarat pendaftaran:<ul>${CONFIG.syarat.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` }) },
  { kw: ['daftar ekskul', 'ekskul apa', 'pilihan ekskul', 'apa saja', 'macam', 'semua ekskul', 'list ekskul', 'ada ekskul', 'ekskul yang ada'],
    run: () => listAnswer('Ini semua ekskul tahun ini:') },
  { kw: ['jadwal', 'hari apa', 'jam berapa', 'kapan latihan', 'waktu latihan', 'latihan hari'],
    run: () => listAnswer('Jadwal latihan tiap ekskul:') },
  { kw: ['kuota', 'penuh', 'sisa', 'slot', 'kursi', 'tersisa'],
    run: () => listAnswer('Sisa kursi saat ini:') },
  { kw: ['batas', 'deadline', 'tutup', 'ditutup', 'sampai kapan', 'kapan daftar', 'kapan pendaftaran'],
    run: jawabBatas },
  { kw: ['biaya', 'bayar', 'iuran', 'gratis', 'uang', 'harga', '~bayar'],
    run: () => ({ html: esc(CONFIG.biaya) }) },
  { kw: ['bukti', 'nomor pendaftaran', 'cetak', 'konfirmasi', 'sudah terdaftar'],
    run: () => ({ html: 'Setelah kamu menekan <b>Kirim pendaftaran</b>, akan muncul bukti dengan nomor pendaftaran. Kamu bisa mencetaknya atau memotretnya, lalu tunjukkan ke pembina di pertemuan pertama.' }) },
  { kw: ['kontak', 'hubungi', 'nomor', 'whatsapp', 'admin', 'email', 'alamat', 'ruang osis', 'pembina osis'],
    run: () => ({ html: `${bold(CONFIG.kontak.nama)}<br>WhatsApp: ${esc(CONFIG.kontak.wa)}<br>Email: ${esc(CONFIG.kontak.email)}<br>Lokasi: ${esc(CONFIG.kontak.lokasi)}` }) },
  { kw: ['maksimal', 'maksimum', 'berapa ekskul', 'lebih dari satu', 'boleh dua', 'dua ekskul', 'banyak ekskul', 'pilihan kedua'],
    run: () => ({ html: `Kamu boleh ikut maksimal ${bold(MAKS_EKSKUL + ' ekskul')}: satu pilihan utama dan satu pilihan kedua (opsional). Pastikan jadwalnya tidak bentrok ya.` }) },
  { kw: ['seragam', 'perlengkapan', 'bawa', 'alat', 'sepatu', 'kostum', 'peralatan'],
    run: () => ({ html: 'Perlengkapan berbeda tiap ekskul. Sebut nama ekskulnya, misalnya <i>"perlengkapan futsal"</i>, nanti kujelaskan.' }) },
  { kw: ['ubah', 'edit', 'salah isi', 'salah input', 'batal', 'ganti', 'hapus', 'revisi'],
    run: () => ({ html: `Sebelum dikirim, kamu bebas mengubah isi formulir. Kalau data sudah terkirim, hubungi ${bold(CONFIG.kontak.nama)} di WhatsApp ${esc(CONFIG.kontak.wa)} agar dibantu diperbaiki.` }) },
  { kw: ['cara', 'langkah', 'alur', 'prosedur', '~daftar', 'isi form', 'formulir', 'gimana', 'bagaimana'],
    run: () => ({
      html: 'Caranya mudah:<ol><li>Isi data dirimu.</li><li>Pilih ekskul utama (dan pilihan kedua kalau mau).</li><li>Isi data orang tua atau wali, lalu centang persetujuan.</li><li>Tekan <b>Kirim pendaftaran</b> dan simpan nomor buktinya.</li></ol>',
      actions: [tanyaBtn('Bantu pilih ekskul', 'bantu pilih ekskul')]
    }) },
  { kw: ['rekomendasi', 'saran', 'bingung', 'cocok', 'bantu pilih', 'pilih apa', 'enaknya', 'sebaiknya', 'suka', 'hobi', 'minat'],
    run: tanyaMinat }
];

const SAPA = () => ({
  html: `Halo! Aku ${bold('Kak Eka')}, asisten pendaftaran ekskul ${esc(CONFIG.sekolah)}. Aku bisa bantu soal jadwal, kuota, cara daftar, dan memilih ekskul yang cocok.`,
  actions: [tanyaBtn('Bantu pilih ekskul', 'bantu pilih ekskul'), tanyaBtn('Cara daftar')]
});

function respond(raw) {
  const t = normalize(raw);
  const any = kws => kws.some(k => hasKw(t, k));

  if (any(['terima kasih', 'makasih', 'thanks', 'thx', 'trims'])) {
    return { html: 'Sama-sama! Kalau masih ada yang ingin ditanyakan, aku di sini. Semoga kamu dapat ekskul yang seru.' };
  }
  if (any(['dadah', 'bye', 'sampai jumpa', 'sampai nanti'])) {
    return { html: 'Sampai jumpa! Jangan lupa tekan Kirim pendaftaran kalau formulirnya sudah lengkap.' };
  }
  if (any(['siapa kamu', 'kamu siapa', 'nama kamu', 'kamu bot', 'kamu manusia'])) {
    return { html: 'Aku Kak Eka, asisten virtual pendaftaran ekskul. Aku menjawab berdasarkan data di halaman ini dan tidak menggantikan pembina. Untuk hal di luar itu, hubungi pembina ya.', actions: [tanyaBtn('Kontak pembina', 'kontak')] };
  }

  const ek = matchEkskul(t);
  if (ek.length === 1) return ekskulDetail(ek[0]);
  if (ek.length > 1) return bandingkan(ek);

  const minat = matchMinat(t);
  if (minat.length) return rekomendasi(minat);

  for (const it of INTENTS) if (any(it.kw)) return it.run();

  if (/^(halo|hallo|hai|hi|hello|pagi|siang|sore|malam|assalamualaikum|selamat)/.test(t)) return SAPA();

  return {
    html: 'Maaf, aku belum paham pertanyaanmu. Coba tanya soal jadwal, kuota, cara daftar, atau nama ekskul tertentu.',
    actions: [tanyaBtn('Cara daftar'), tanyaBtn('Daftar ekskul'), tanyaBtn('Bantu pilih ekskul', 'bantu pilih ekskul'), tanyaBtn('Kontak pembina', 'kontak')]
  };
}

/* ---------- Tampilan chat ---------- */
function addMsg(who, content, actions) {
  const wrap = document.createElement('div');
  wrap.className = 'msg msg-' + who;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  if (who === 'user') bubble.textContent = content; // teks pengguna tidak pernah dijadikan HTML
  else bubble.innerHTML = content;
  wrap.appendChild(bubble);

  if (actions && actions.length) {
    const box = document.createElement('div');
    box.className = 'bot-actions';
    actions.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'act' + (a.primary ? ' act-primary' : '');
      b.textContent = a.label;
      b.addEventListener('click', () => runAction(a));
      box.appendChild(b);
    });
    wrap.appendChild(box);
  }
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
  return wrap;
}

function typingIndicator() {
  const wrap = document.createElement('div');
  wrap.className = 'msg msg-bot';
  wrap.innerHTML = '<div class="bubble typing" aria-label="Kak Eka sedang mengetik"><i></i><i></i><i></i></div>';
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
  return wrap;
}

function botSay(res, delay) {
  const t = typingIndicator();
  const ms = delay !== undefined ? delay : 450 + Math.random() * 400;
  setTimeout(() => {
    t.remove();
    addMsg('bot', res.html, res.actions);
  }, ms);
}

function userSays(text) {
  addMsg('user', text);
  botSay(respond(text));
}

function runAction(a) {
  if (a.pilih) chooseEkskul(a.pilih);
  else if (a.tanya) userSays(a.tanya);
}

/* Chatbot mengisi formulir: pilihan utama dulu, lalu pilihan kedua */
function chooseEkskul(id) {
  const e = byId(id);
  if (!e) return;
  if (sisaKuota(e) <= 0) {
    botSay({ html: `Maaf, kuota ${bold(e.nama)} sudah penuh. Coba lihat ekskul lain yang masih ada kursinya.`, actions: [tanyaBtn('Lihat ekskul lain', 'daftar ekskul')] });
    return;
  }
  const p1 = val('pilihan1');
  let msg, target;

  if (!p1) {
    const radio = form.querySelector(`input[name="pilihan1"][value="${id}"]`);
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
    msg = `Oke, ${bold(e.nama)} sudah kupilih sebagai <b>pilihan utama</b>. Lanjut isi data dirimu di formulir ya.`;
    target = $('#ekskulGrid');
  } else if (p1 === id) {
    msg = `${bold(e.nama)} sudah jadi pilihan utamamu.`;
    target = $('#ekskulGrid');
  } else {
    const sel = form.elements.pilihan2;
    sel.value = id;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    msg = `Siap, ${bold(e.nama)} kutaruh sebagai <b>pilihan kedua</b>.`;
    target = sel;
  }

  if (isMobile()) toggleChat(false);
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  botSay({ html: msg }, 300);
}

function toggleChat(open) {
  chatEl.classList.toggle('open', open);
  document.body.classList.toggle('chat-open', open);
  $('#chatFab').setAttribute('aria-expanded', String(open));
  if (open) setTimeout(() => chatText.focus(), 320);
}

function initChat() {
  chatEl = $('#chat');
  chatLog = $('#chatLog');
  chatText = $('#chatText');

  // tombol pertanyaan cepat
  const chips = [['Cara daftar'], ['Daftar ekskul'], ['Batas pendaftaran'], ['Bantu pilih ekskul'], ['Biaya'], ['Kontak']];
  $('#chips').innerHTML = chips.map(([l]) => `<button type="button" class="chip">${esc(l)}</button>`).join('');
  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (b) userSays(b.textContent);
  });

  $('#chatForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = chatText.value.trim();
    if (!v) return;
    chatText.value = '';
    userSays(v);
  });

  $('#chatFab').addEventListener('click', () => toggleChat(true));
  $('#chatClose').addEventListener('click', () => toggleChat(false));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatEl.classList.contains('open')) toggleChat(false);
  });

  const s = SAPA();
  addMsg('bot', s.html, s.actions);
}

/* =========================================================
   ADMIN SEDERHANA (dipakai lewat Console browser)
   ekskulAdmin.list()       -> lihat semua pendaftar
   ekskulAdmin.exportCSV()  -> unduh data sebagai file CSV
   ekskulAdmin.clear()      -> hapus semua data pendaftar
   ========================================================= */
function initAdmin() {
  window.ekskulAdmin = {
    list: () => loadRegs(),
    exportCSV() {
      const regs = loadRegs();
      if (!regs.length) return console.info('Belum ada data pendaftar.');
      const cols = Object.keys(regs[0]);
      const q = v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
      const csv = [cols.join(',')].concat(regs.map(r => cols.map(c => q(r[c])).join(','))).join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
      a.download = 'pendaftar-ekskul.csv';
      a.click();
    },
    clear() { localStorage.removeItem(STORE_KEY); location.reload(); }
  };
}

/* =========================================================
   INISIALISASI
   ========================================================= */
function init() {
  form = $('#regForm');

  document.title = `Pendaftaran Ekstrakurikuler | ${CONFIG.sekolah}`;
  $('#schoolName').textContent = CONFIG.sekolah;
  $('#schoolMark').textContent = CONFIG.sekolah.split(/\s+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();
  $('#tahunAjaran').textContent = CONFIG.tahunAjaran;
  $('#factDeadline').textContent = fmtTanggal(deadlineDate());
  $('#factMaks').textContent = `Maksimal ${MAKS_EKSKUL} ekskul`;
  $('#factBiaya').textContent = CONFIG.biayaSingkat;

  renderTiles();
  renderPilihan2();
  bindForm();
  initReceipt();
  initChat();
  initAdmin();
  updateProgress();
}

document.addEventListener('DOMContentLoaded', init);