export function generateLandingPagePrompt(d) {
  const categoryFinal = d.category_base === 'custom' ? d.category_custom : d.category_base;
  const targetFinal = d.target_base === 'custom' ? d.target_custom : d.target_base;
  const ctaFinal = d.cta_base === 'custom' ? d.cta_custom : d.cta_base;
  const brandColorFinal = d.brand_color === 'custom' ? d.color_custom : d.brand_color;
  const painPoints = d.pain_points || 'Tidak dispesifikan, harap riset mandiri.';
  const objections = d.objections || 'Umum (Harga/Kualitas).';
  const bonusDetails = d.has_bonus ? d.bonus_details : 'Tidak ada bonus tambahan.';
  const stickyMobile = d.sticky_mobile ? 'YA' : 'TIDAK';

  let themeInstruction = '';
  if (d.theme_override === 'Light') themeInstruction = 'Wajib menggunakan latar belakang Light Mode (Terang) di seluruh bagian. Gunakan warna teks gelap (hitam/abu-abu) untuk keterbacaan yang maksimal.';
  else if (d.theme_override === 'Dark') themeInstruction = 'Wajib menggunakan latar belakang Dark Mode (Gelap) di seluruh bagian. Gunakan warna teks terang (putih/abu) untuk keterbacaan yang maksimal.';
  else themeInstruction = 'Tema warna harus disesuaikan sepenuhnya dengan gaya desain yang dipilih.';

  let layoutInstruction = '';
  if (d.platform === 'Scalev' || d.platform === 'Lynk.id') layoutInstruction = `STRUKTUR: FULL-WIDTH MOBILE-FIRST (Mutlak).
- Container Utama: Gunakan class 'w-full' (Width 100%). JANGAN gunakan 'container' atau 'max-w-md'.
- Padding: Gunakan padding internal section (py-10 px-4), tapi container luar harus menempel ke tepi layar (edge-to-edge).
- Grid: DILARANG menggunakan grid multi-kolom (>1 kolom).
- Behavior: Semua elemen disusun vertikal (atas ke bawah).
- Alasan: Agar saat di-embed di platform ini tidak ada celah/garis vertikal di kiri-kanan (full screen experience).`;
  else layoutInstruction = `STRUKTUR: FULLY RESPONSIVE GRID / STACKING.
- Desktop: Gunakan layout lebar (container 'max-w-7xl mx-auto'). Gunakan Grid 2 kolom untuk Hero/Features (Teks Kiri, Gambar Kanan).
- Mobile: WAJIB 'Responsive Stacking'. Ubah grid menjadi 1 kolom (class: 'grid-cols-1 md:grid-cols-2').
- Behavior: Pastikan elemen menumpuk rapi ke bawah saat layar kecil, namun sejajar horizontal saat desktop.`;

  const sectionsInstruction = d.sections.length > 0
    ? `Wajib masukkan section tambahan berikut: ${d.sections.join(', ')}.`
    : 'Gunakan struktur standar sesuai framework.';

  let heroInstruction = '';
  if (d.hero_type === 'Video Sales Letter (VSL)') heroInstruction = 'HERO SECTION: Gunakan layout VSL. Video embed (placeholder YT/Vimeo) harus menjadi fokus utama, dengan Headline besar di atasnya dan tombol CTA di bawahnya. JANGAN gunakan gambar samping.';
  else heroInstruction = 'HERO SECTION: Gunakan layout Hero standar (Gambar/Ilustrasi + Copy).';

  return `ANDA ADALAH: Senior Conversion Copywriter + UI/UX minded marketer yang sudah menciptakan ratusan landing page yang mengkonversi untuk penjualan di social media.

TUGAS ANDA: Menulis Copywriting Landing Page (Sales Page) dengan struktur HTML yang rapi, persuasif, dan aman untuk kebijakan iklan (Meta/Google Ads Compliance).

ATURAN PENULISAN & LAYOUT (WAJIB DIPATUHI):
1. LAYOUT & GRID SYSTEM: ${layoutInstruction}
2. GLOBAL STYLE: Wajib set 'body { overflow-x: hidden; }' untuk mencegah scroll horizontal pada tampilan mobile. Pastikan wrapper/container utama tidak melebihi lebar layar (100vw).
3. FOOTER: DILARANG membuat section footer standar (Links/Menu/Sitemap) karena ini adalah Landing Page yang fokus penjualan. Cukup akhiri dengan Copyright notice kecil di bagian paling bawah atau padding kosong.
4. TEMA VISUAL: ${themeInstruction}
5. HERO TYPE: ${d.hero_type}. ${heroInstruction}
6. STICKY CTA MOBILE: ${stickyMobile === 'YA' ? 'WAJIB membuat tombol CTA Melayang (Sticky Bottom) yang hanya muncul di layar mobile agar mudah diakses saat scroll.' : 'Tidak perlu sticky button.'}
7. BUTTON STYLING: Teks tombol WAJIB KONSISTEN (Jangan berubah warna saat hover/klik). DILARANG menggunakan underline pada teks tombol. Gunakan '!important' pada properti warna teks dan text-decoration untuk memaksa style ini.
8. SCARCITY LOGIC: Gunakan tipe kelangkaan "${d.scarcity_type}". Jika Real Timer, buatkan placeholder script JS countdown sederhana. Jika Quantity, tuliskan teks "Sisa Slot: X".
9. Skimming-friendly: Gunakan heading yang jelas dan bullet points.
10. Anti Overclaim: Jangan gunakan kata "pasti", "jamin", "100%", atau klaim medis/finansial yang tidak realistis agar aman dari banned iklan.
11. Penyesuaian Awareness: Tulis copywriting dengan level awareness "${d.awareness}".
12. Tone: Gunakan gaya bahasa "${d.tone}".
13. GAMBAR & ICON: Gunakan placeholder dari 'https://placehold.co/600x400' untuk gambar, dan SVG inline (Lucide/Heroicons) untuk icon.

PROFIL PRODUK & MARKET:
- Nama Produk: ${d.product_name}
- Kategori: ${categoryFinal}
- Target Market: ${targetFinal}
- Tujuan Utama: ${d.goal}
- Framework Utama: ${d.framework}

PSIKOLOGI AUDIENS (INPUT PENTING):
- Pain Points (Ketakutan Utama): ${painPoints}
- Objection Handling (Alasan Ragu): ${objections} (Gunakan ini untuk section FAQ atau Reassurance).

PENAWARAN (OFFER STACK):
- Harga Normal: ${d.price_normal || 'Tidak dispesifikan'}
- Harga Promo: ${d.price_promo || 'Tidak ada promo'}
- Bonus / Value Stack: ${bonusDetails} (Jika ada, buatkan tabel/list "Total Value" vs "Harga Hari Ini").
- CTA Utama: "${ctaFinal}"

STRUKTUR HALAMAN (PLATFORM: ${d.platform}):
1. HERO SECTION: Hook maut yang relevan dengan ${painPoints}.
2. BODY CONTENT: Mengikuti alur framework ${d.framework}.
3. OBJECTION HANDLING BLOCK: Jawab keraguan "${objections}" secara elegan.
4. ADDITIONAL SECTIONS: ${sectionsInstruction}
5. TRUST ELEMENTS: Masukkan Social Proof dan Reassurance.
6. CONVERSION BLOCK: Kontras harga, bonus stack, dan urgensi (${d.scarcity_type}).
7. HIDDEN CTA: Pastikan ada micro-copy trust di bawah tombol.

OUTPUT: Generate kode HTML utuh (single file) dengan Tailwind CSS, visual premium sesuai gaya "${d.design_style}" dengan nuansa warna dominan "${brandColorFinal}", dan copywriting yang sangat persuasif namun aman secara regulasi.`;
}

export function generateWebsitePrompt(d) {
  const brandColorFinal = d.web_brand_color === 'custom' ? d.web_color_custom : d.web_brand_color;
  const typeFinal = d.web_type === 'custom' ? d.web_type_custom : d.web_type;
  const targetFinal = d.web_target === 'custom' ? d.web_target_custom : d.web_target;
  const toneFinal = d.web_tone === 'custom' ? d.web_tone_custom : d.web_tone;

  let layoutInstruction = '';
  if (d.web_platform === 'Scalev') layoutInstruction = `STRUKTUR: FULL-WIDTH MOBILE-FIRST (Mutlak).
- Container: Gunakan class 'w-full'. JANGAN gunakan container dengan margin otomatis di kiri kanan.
- Layout: Single Column Only (1 Kolom). Jangan gunakan grid berdampingan.
- Behavior: Semua elemen vertikal.
- Alasan: Scalev adalah mobile-builder, layout desktop akan rusak jika ada margin.`;
  else layoutInstruction = `STRUKTUR: FULLY RESPONSIVE STACKING.
- Desktop: Layout lebar dengan Container standar. Gunakan Grid System untuk layout hero, services, dll.
- Mobile: Stack vertikal (tumpuk ke bawah) dengan class responsif Tailwind (cth: grid-cols-1 md:grid-cols-3).`;

  let themeInstruction = '';
  if (d.web_theme_override === 'Light') themeInstruction = 'Wajib Light Mode (Background terang, teks gelap).';
  else if (d.web_theme_override === 'Dark') themeInstruction = 'Wajib Dark Mode (Background gelap, teks terang).';
  else themeInstruction = 'Sesuai gaya desain yang dipilih.';

  const socials = [];
  if (d.web_ig) socials.push('Instagram: ' + d.web_ig);
  if (d.web_fb) socials.push('Facebook: ' + d.web_fb);
  if (d.web_tt) socials.push('TikTok: ' + d.web_tt);
  if (d.web_x) socials.push('X: ' + d.web_x);
  if (d.web_threads) socials.push('Threads: ' + d.web_threads);
  if (d.web_yt) socials.push('YouTube: ' + d.web_yt);
  if (d.web_linkedin) socials.push('LinkedIn: ' + d.web_linkedin);
  if (d.web_wa) socials.push('WhatsApp: ' + d.web_wa);

  const functionalsMapped = d.web_functionals.map(f => {
    if (f === 'Newsletter Form') return 'Newsletter Form';
    if (f === 'Embedded Map') return 'Google Map Embed';
    if (f === 'Floating WhatsApp') return 'Floating WhatsApp Button';
    if (f === 'Language Switcher') return 'Language Switcher (ID/EN)';
    return f;
  });

  return `ANDA ADALAH: Senior Web Designer & UI/UX Expert yang menguasai HTML, Tailwind CSS, dan prinsip modern design.

TUGAS ANDA: Membuat Website profesional (Company Profile/Portfolio) dengan struktur HTML semantik, responsif, dan mencerminkan kredibilitas brand.

ATURAN DESAIN & LAYOUT (WAJIB DIPATUHI):
1. LAYOUT & GRID: ${layoutInstruction} (Gaya Hero: ${d.web_hero_style})
2. GLOBAL STYLE: Wajib set 'body { overflow-x: hidden; }' untuk mencegah scroll horizontal pada tampilan mobile. Pastikan wrapper/container utama tidak melebihi lebar layar (100vw).
3. TEMA VISUAL: ${themeInstruction}
4. NAVIGASI: Navbar gaya "${d.web_nav_style}". Pastikan UX intuitif.
5. BUTTON STYLING: Teks tombol WAJIB KONSISTEN (Jangan berubah warna saat hover/klik). DILARANG menggunakan underline pada teks tombol. Gunakan '!important' pada properti warna teks dan text-decoration untuk memaksa style ini.
6. STRUKTUR HALAMAN: ${d.web_page_structure}. Jika Multi-page, buatkan menu navigasi dummy yang representatif.
7. SEO: Gunakan tag semantik (<header>, <main>, <section>, <footer>). Masukkan keyword "${d.web_seo}" di Meta Tags dan Heading utama.
8. ANTI-LOREM IPSUM: Dilarang menggunakan teks Lorem Ipsum pada headline utama. Gunakan teks dummy yang relevan berdasarkan Deskripsi Brand.
9. CSS VARIABLE: Definisikan warna utama brand di :root agar mudah diganti user.
10. GAMBAR: Gunakan placeholder 'https://placehold.co/600x400' atau 'https://placehold.co/1200x600' (Hero). Jangan biarkan src kosong.

BRIEF PROYEK:
- Nama Brand: ${d.web_name}
- Tagline: ${d.web_tagline}
- Tipe Website: ${typeFinal}
- Deskripsi: ${d.web_desc}
- Masalah Klien: ${d.web_problem}
- Solusi Kami: ${d.web_solution}
- Primary CTA: "${d.web_cta || 'Hubungi Kami'}"
- Target Pengunjung: ${targetFinal}
- Tone of Voice: ${toneFinal}

KREDIBILITAS & ASET:
- USP: ${d.web_usp || 'Tidak dispesifikan'}
- Tahun Berdiri: ${d.web_year || 'N/A'}
- Sosial Media: ${socials.length > 0 ? socials.join(', ') : 'Tidak ada'}
- Layanan Utama: ${d.web_services || 'Tidak ada'}
- Info Kontak: ${d.web_contact || 'Tidak ada'}

DESAIN:
- Gaya Desain: ${d.web_design_style}
- Warna Brand: ${brandColorFinal}
- Platform Target: ${d.web_platform}

STRUKTUR SECTION: ${d.web_sections.join(', ')}
ELEMEN FUNGSIONAL TAMBAHAN: ${functionalsMapped.length > 0 ? functionalsMapped.join(', ') : 'Standar'}

OUTPUT: Generate kode HTML lengkap (single file) dengan Tailwind CSS. Pastikan desainnya profesional, clean, dan sesuai semua aturan di atas.`;
}

export function generateLinkBioPrompt(d) {
  const brandColorFinal = d.bio_brand_color === 'custom' ? d.bio_color_custom : d.bio_brand_color;
  const bgUrl = d.bio_bg_url;

  let layoutInstruction = '';
  if (d.bio_platform === 'Scalev') layoutInstruction = "Full Width Mobile Container (w-full). Jangan beri margin kiri-kanan pada container utama.";
  else layoutInstruction = 'Responsif center aligned dengan max-width 480px (Standard Linktree Style).';

  let themeInstruction = '';
  if (d.bio_theme_override === 'Light') themeInstruction = 'Light Mode (Background terang, teks gelap).';
  else if (d.bio_theme_override === 'Dark') themeInstruction = 'Dark Mode (Background gelap, teks terang).';
  else themeInstruction = 'Sesuai gaya desain yang dipilih.';

  const socials = [];
  if (d.bio_ig) socials.push('Instagram: ' + d.bio_ig);
  if (d.bio_fb) socials.push('Facebook: ' + d.bio_fb);
  if (d.bio_tiktok) socials.push('TikTok: ' + d.bio_tiktok);
  if (d.bio_x) socials.push('X: ' + d.bio_x);
  if (d.bio_threads) socials.push('Threads: ' + d.bio_threads);
  if (d.bio_yt) socials.push('YouTube: ' + d.bio_yt);
  if (d.bio_linkedin) socials.push('LinkedIn: ' + d.bio_linkedin);
  if (d.bio_wa) socials.push('WhatsApp: ' + d.bio_wa);

  const featured = [];
  if (d.bio_video) featured.push('Video Embed: ' + d.bio_video);
  if (d.bio_countdown) featured.push('Countdown: ' + d.bio_countdown);
  if (d.bio_music) featured.push('Music Embed (Spotify/Apple): ' + d.bio_music);
  if (d.bio_donation) featured.push('Donation Text: ' + d.bio_donation);
  if (d.bio_contact_form) featured.push('Contact Form (Simple inputs)');

  return `ANDA ADALAH: UI/UX Designer spesialis micro-site dan personal branding.

TUGAS ANDA: Membuat halaman "Link in Bio" yang modern, responsif, dan eye-catching untuk profil personal brand.

ATURAN DESAIN & LAYOUT (WAJIB DIPATUHI):
1. LAYOUT: ${layoutInstruction}
2. GLOBAL STYLE: Wajib set 'body { overflow-x: hidden; }' untuk mencegah scroll horizontal pada tampilan mobile. Pastikan wrapper/container utama tidak melebihi lebar layar (100vw).
3. TEMA VISUAL: ${themeInstruction}
4. PROFILE PHOTO: Gunakan bentuk "${d.bio_photo_shape}". Tampilkan dengan ukuran proporsional (80-120px). Placeholder: 'https://placehold.co/150'
5. BUTTON STYLE: Gunakan bentuk "${d.bio_btn_shape}" dengan layout "${d.bio_layout}".
6. BUTTON TEXT: Teks tombol WAJIB KONSISTEN (Jangan berubah warna saat hover/klik). DILARANG menggunakan underline pada teks tombol. Gunakan '!important' pada properti warna teks dan text-decoration untuk memaksa style ini.
7. ANIMASI: Tambahkan efek "${d.bio_anim}" pada tombol penting.
8. TYPOGRAPHY: Gunakan gaya font "${d.bio_font}".
9. BACKGROUND: ${d.bio_bg_type} ${bgUrl ? '(URL: ' + bgUrl + ')' : ''}.
10. MOBILE FIRST: Pastikan tampilan mobile sempurna sebelum desktop.
11. CSS VARIABLE: Gunakan variabel CSS untuk warna utama agar mudah dikustomisasi.

PROFIL:
- Nama: ${d.bio_name}
- Role: ${d.bio_role}
- Bio: ${d.bio_desc}

SOCIAL MEDIA BAR:
${socials.length > 0 ? socials.join('\n') : 'Tidak ada sosial media yang ditampilkan.'}

LINK UTAMA & KONTEN:
- Highlight Link: ${d.bio_main_link || 'Tidak ada'}
- List Link:
${d.bio_links}

FEATURED CONTENT & WIDGETS:
${featured.length > 0 ? featured.join('\n') : 'Tidak ada konten featured.'}

DESAIN:
- Gaya Desain: ${d.bio_design_style}
- Warna Brand: ${brandColorFinal}
- Platform Target: ${d.bio_platform}

OUTPUT: Generate kode HTML lengkap (single file) dengan Tailwind CSS. Pastikan desainnya estetik, ringan, dan sesuai semua aturan di atas.`;
}
