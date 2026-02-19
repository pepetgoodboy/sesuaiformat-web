// Select options format: [groupLabel, [[value, displayText], ...]]
// Simple options format: [[value, displayText], ...]

// ==================== SHARED OPTIONS ====================
export const brandColorOptions = [
  ['A. Netral / Monokrom', [['Neutral (White/Black/Gray)', 'Neutral / Monokrom'], ['Slate / Zinc (Cool Gray)', 'Slate / Zinc']]],
  ['B. Oranye & Merah', [['Brand Orange (Vibrant)', 'Brand Orange'], ['Red (Bright/Alert)', 'Red'], ['Rose / Pink', 'Rose / Pink'], ['Amber / Gold', 'Amber / Gold']]],
  ['C. Biru & Ungu', [['Ocean Blue', 'Ocean Blue'], ['Sky Blue (Soft)', 'Sky Blue'], ['Indigo (Deep Blue)', 'Indigo'], ['Violet / Purple', 'Violet / Purple'], ['Royal Purple', 'Royal Purple']]],
  ['D. Hijau & Cyan', [['Emerald Green', 'Emerald Green'], ['Teal / Cyan', 'Teal / Cyan'], ['Lime (Bright Green)', 'Lime Green'], ['Forest Green', 'Forest Green']]],
  ['E. Kuning & Coklat', [['Yellow (Bright)', 'Yellow'], ['Brown / Earthy', 'Brown / Earthy']]],
  ['F. Custom', [['custom', 'Lainnya / Custom (Ketik Hex/Nama)']]],
];

export const designStyleOptions = [
  ['A. Archetype Brand', [['Apple Style', 'Apple Style'], ['Stripe / Linear Style', 'Stripe / Linear Style'], ['Airbnb Style', 'Airbnb Style'], ['Notion Style', 'Notion Style'], ['Nike / Adidas Style', 'Nike / Adidas Style'], ['Tesla Style', 'Tesla Style']]],
  ['B. Popular', [['Clean & Minimalist', 'Clean & Minimalist'], ['Modern SaaS', 'Modern SaaS'], ['Bold & High Conversion', 'Bold & High Conversion'], ['Elegant & Premium', 'Elegant & Premium'], ['Trust & Authority', 'Trust & Authority'], ['Dark Mode Style', 'Dark Mode Style']]],
  ['C. Tech & Future', [['Futuristic Cyberpunk', 'Futuristic Cyberpunk'], ['AI / SaaS Modern', 'AI / SaaS Modern'], ['Holographic & Glass', 'Holographic & Glass'], ['Abstract Gradient (Web3)', 'Abstract Gradient']]],
  ['D. Trending', [['Bento Grid / Modular', 'Bento Grid / Modular'], ['Neobrutalism', 'Neobrutalism'], ['Glassmorphism', 'Glassmorphism']]],
  ['E. Industry Specific', [['Medical / Health', 'Medical / Health'], ['Real Estate', 'Real Estate'], ['Wedding / Event', 'Wedding / Event'], ['Finance / Bank', 'Finance / Bank'], ['Gamer / Neon', 'Gamer / Neon'], ['Organic & Natural', 'Organic & Natural'], ['Corporate / Blue-Chip', 'Corporate']]],
  ['F. Mood & Vibe', [['Playful & Fun', 'Playful & Fun'], ['Typography-Driven', 'Typography-Driven'], ['Retro / Vintage', 'Retro / Vintage'], ['Visual Storytelling', 'Visual Storytelling']]],
];

export const themeOverrideOptions = [
  ['Default', 'Default (Ikuti Gaya Desain)'], ['Light', 'Force Light Mode (Terang)'], ['Dark', 'Force Dark Mode (Gelap)'],
];

// ==================== LANDING PAGE OPTIONS ====================
export const frameworkOptions = [
  ['A. Conversion Focused', [['AIDCA (Attention–Interest–Desire–Conviction–Action)', 'AIDCA'], ['PAS (Problem–Agitate–Solution)', 'PAS (Problem–Agitate–Solution)'], ['BAB (Before–After–Bridge)', 'BAB (Before–After–Bridge)'], ['4P (Promise–Picture–Proof–Push)', '4P (Promise–Picture–Proof–Push)'], ['SLAP (Stop–Look–Act–Purchase)', 'SLAP (Stop–Look–Act–Purchase)']]],
  ['B. Storytelling & Brand', [['StoryBrand (Hero–Problem–Guide–Plan–Action–Success)', 'StoryBrand'], ['ABT (And–But–Therefore)', 'ABT (And–But–Therefore)'], ["Hero's Journey (Problem–Struggle–Breakthrough–Change)", "Hero's Journey"], ['Hook–Story–Offer (HSO)', 'Hook–Story–Offer (HSO)']]],
  ['C. Diagnostic & Educational', [['QUEST (Qualify–Understand–Educate–Stimulate–Transition)', 'QUEST'], ['JTBD (Situation–Motivation–Obstacle–Outcome)', 'JTBD (Jobs To Be Done)'], ['Awareness Ladder (Unaware → Most Aware)', 'Awareness Ladder'], ['FAB (Features–Advantages–Benefits)', 'FAB (Features–Advantages–Benefits)']]],
  ['D. Advanced / Hybrid', [['PASTOR (Problem–Amplify–Story–Transformation–Offer–Response)', 'PASTOR'], ['Problem–Promise–Proof', 'Problem–Promise–Proof'], ['Useful–Urgent–Unique', 'Useful–Urgent–Unique'], ['The 3 Reason Why', 'The 3 Reason Why']]],
];

export const toneOptions = [
  ['Populer & Efektif', [['Friendly & Conversational (Santai tapi sopan)', 'Friendly & Conversational'], ['Professional & Formal (Serius dan berwibawa)', 'Professional & Formal'], ['Witty & Humorous (Menyenangkan dan ber-joke)', 'Witty & Humorous'], ['Bold & Disruptive (Berani dan menonjol)', 'Bold & Disruptive']]],
  ['Emosional & Story', [['Empathetic (Sangat memahami masalah user)', 'Empathetic'], ['Storytelling (Narasi yang mengalir)', 'Storytelling Mode'], ['Inspirational & Visionary (Memotivasi)', 'Inspirational'], ['Exciting & Energetic (Penuh antusiasme)', 'Exciting & Energetic']]],
  ['Authority & Logic', [['Direct & No-Nonsense (Langsung to the point)', 'Direct & To The Point'], ['Scientific & Data-Driven (Berdasarkan fakta)', 'Scientific / Data-Driven'], ['Trustworthy & Reassuring (Menenangkan/Terpercaya)', 'Trustworthy'], ['Urgent & Aggressive (Mendorong aksi cepat)', 'Urgent / Scarcity']]],
  ['Vibe Khusus', [['Luxury & Exclusive (Elegan dan mahal)', 'Luxury & Exclusive'], ['Minimalist & Zen (Tenang dan simple)', 'Minimalist & Zen']]],
];

export const categoryOptions = [
  ['A. Digital Product', [['Digital (Ebook / Template)', 'Ebook / Template'], ['Digital (Mini Course / Video)', 'Mini Course / Video'], ['Digital (Toolkit / Resource Pack)', 'Toolkit / Resource Pack'], ['Digital (Membership / Komunitas)', 'Membership / Komunitas'], ['Digital (Bundle / Paket)', 'Bundle / Paket']]],
  ['B. Service / Jasa', [['Jasa (Agency / Freelance)', 'Agency / Freelance'], ['Jasa (Konsultasi 1:1)', 'Konsultasi 1:1'], ['Jasa (Done-For-You / Implementasi)', 'Done-For-You'], ['Jasa (Audit / Review)', 'Audit / Review'], ['Jasa (Maintenance / Retainer)', 'Maintenance / Retainer']]],
  ['C. Physical / Commerce', [['Fisik (Skincare / Fashion)', 'Skincare / Fashion'], ['Fisik (Food & Beverage)', 'Food & Beverage'], ['Fisik (Kesehatan Umum / Wellness)', 'Kesehatan Umum / Wellness'], ['Fisik (Home & Living)', 'Home & Living'], ['Fisik (Gadget / Aksesoris)', 'Gadget / Aksesoris']]],
  ['D. Software', [['SaaS / Software', 'SaaS / Software'], ['App / Mobile', 'App / Mobile'], ['Plugin / Add-on', 'Plugin / Add-on']]],
  ['E. Education', [['Kursus / Coaching', 'Kursus / Coaching'], ['Bootcamp / Program Intensif', 'Bootcamp / Program Intensif'], ['Workshop', 'Workshop']]],
  ['F. Event & Social', [['Event / Webinar', 'Event / Webinar'], ['Event Offline', 'Event Offline'], ['Fundraising / Donasi', 'Fundraising / Donasi']]],
  ['G. Lainnya', [['custom', 'Lainnya (Isi Manual)']]],
];

export const goalOptions = [
  ['A. Acquire', [['Lead Generation (Kumpulin No. WA / Email)', 'Lead Generation (WA/Email)'], ['Download (Lead Magnet / Freebie)', 'Download (Lead Magnet)'], ['Registrasi (Event / Waiting List)', 'Registrasi (Event/WL)']]],
  ['B. Convert', [['Sales / Konversi (Beli Langsung)', 'Sales / Beli Langsung'], ['Checkout (Keranjang / Payment)', 'Checkout (Keranjang)'], ['Pre-Order', 'Pre-Order'], ['Flash Sale / Limited Offer', 'Flash Sale']]],
  ['C. Try', [['Trial / Demo (Coba Dulu)', 'Trial / Demo'], ['Sample / Pengalaman Produk', 'Sample / Preview'], ['Free Consultation Entry', 'Free Consultation']]],
  ['D. Contact', [['Chat (Masuk ke WA / DM)', 'Chat (WA / DM)'], ['Booking (Jadwal / Appointment)', 'Booking (Jadwal)'], ['Konsultasi (Discovery Call)', 'Konsultasi']]],
];

export const awarenessOptions = [
  ['Unaware', 'Unaware (Belum sadar masalah)'],
  ['Problem Aware', 'Problem Aware (Tahu masalah)'],
  ['Solution Aware', 'Solution Aware (Cari solusi)'],
  ['Product Aware', 'Product Aware (Tahu produk Anda)'],
  ['Most Aware', 'Most Aware (Siap beli)'],
];

export const targetOptions = [
  ['A. Marketing & Ads', [['Advertiser (FB Ads / TikTok Ads User)', 'Advertiser'], ['Performance Marketer', 'Performance Marketer']]],
  ['B. Business', [['Business Owner (UMKM / Brand Owner)', 'Business Owner (UMKM)'], ['Founder Startup (Early Stage)', 'Founder Startup'], ['Owner Toko Offline', 'Owner Toko Offline']]],
  ['C. Commerce', [['Seller Marketplace (Shopee / Tokopedia)', 'Seller Marketplace'], ['Reseller / Dropshipper', 'Reseller / Dropshipper']]],
  ['D. Creator Economy', [['Content Creator / Affiliate', 'Content Creator / Affiliate'], ['Influencer (Nano / Micro)', 'Influencer (Nano/Micro)'], ['Coach / Mentor / Trainer', 'Coach / Mentor / Trainer']]],
  ['E. Demographics Specific', [['Ibu Rumah Tangga / Moms', 'Ibu Rumah Tangga / Moms'], ['Pelajar / Mahasiswa', 'Pelajar / Mahasiswa'], ['Fresh Graduate (Jobseeker)', 'Fresh Graduate']]],
  ['F. Other', [['Umum (General Audience)', 'Umum (General Audience)'], ['custom', 'Lainnya (Isi Manual)']]],
];

export const ctaOptions = [
  ['Beli Sekarang', 'Beli Sekarang'], ['Daftar Sekarang', 'Daftar Sekarang'], ['Gabung Sekarang', 'Gabung Sekarang'],
  ['Konsultasi Gratis', 'Konsultasi Gratis'], ['Download Sekarang', 'Download Sekarang'], ['Amankan Slot', 'Amankan Slot'],
  ['Mulai Sekarang', 'Mulai Sekarang'], ['custom', 'Isi Manual...'],
];

export const scarcityOptions = [
  ['None', 'Tidak Ada'], ['Real Timer (Countdown)', 'Real Timer (Countdown)'],
  ['Quantity Left (Sisa Slot)', 'Quantity Left (Sisa Slot/Stok)'], ['Price Increase Soon', 'Harga Naik Segera'],
];

export const heroTypeOptions = [
  ['Standard Image', 'Standard (Image Samping/Belakang)'],
  ['Video Sales Letter (VSL)', 'Video Sales Letter (VSL)'],
  ['Typographic Driven', 'Typographic Only (Teks Besar)'],
];

export const lpSectionItems = [
  'Social Proof', 'Testimonial', 'FAQ', 'Bonus', 'Guarantee', 'Scarcity', 'Comparison', 'Pricing Table', 'Timeline', 'Team',
];

export const lpPlatforms = ['Scalev', 'Lynk.id', 'WordPress (Elementor/Divi)', 'Shopify'];

// ==================== WEBSITE OPTIONS ====================
export const webTypeOptions = [
  ['Company Profile (Jasa/Konsultan)', 'Company Profile (Jasa)'], ['Company Profile (Produk/Fisik)', 'Company Profile (Produk)'],
  ['Personal Portfolio', 'Personal Portfolio'], ['Restaurant / Cafe', 'Restaurant / Cafe'],
  ['Event / Komunitas', 'Event / Komunitas'], ['custom', 'Lainnya (Isi Manual)'],
];

export const webHeroStyleOptions = [
  ['Split Screen (Kiri Teks, Kanan Gambar)', 'Split Screen (Teks Kiri, Gambar Kanan)'],
  ['Centered Typography (Teks Tengah Dominan)', 'Centered Typography'],
  ['Full Background Image (Teks diatas Gambar)', 'Full Background Image'],
  ['Asymmetric / Creative Layout', 'Asymmetric / Creative'],
];

export const webPageStructureOptions = [
  ['Single Page (Scroll ke bawah)', 'Single Page (One Page)'],
  ['Multi Page (Home, About, Contact terpisah)', 'Multi Page Structure'],
];

export const webTargetOptions = [
  ['Calon Pelanggan (B2C)', 'B2C'], ['Calon Klien Bisnis (B2B)', 'B2B'],
  ['Investor / Stakeholder', 'Investor'], ['Calon Karyawan', 'Calon Karyawan'], ['custom', 'Lainnya'],
];

export const webToneOptions = [
  ['Professional & Formal', 'Professional'], ['Friendly & Warm', 'Friendly'],
  ['Creative & Bold', 'Creative'], ['Luxury & Elegant', 'Luxury'], ['custom', 'Lainnya'],
];

export const webNavStyles = ['Sticky', 'Static', 'Transparent'];

export const webSectionItems = [
  { id: 'Hero', label: 'Hero', locked: true },
  { id: 'About', label: 'About' },
  { id: 'Services', label: 'Services', defaultChecked: true },
  { id: 'Features', label: 'Features' },
  { id: 'Testimonials', label: 'Testimonial' },
  { id: 'Contact', label: 'Contact', defaultChecked: true },
  { id: 'Latest News / Blog', label: 'Blog' },
  { id: 'Footer', label: 'Footer', defaultChecked: true },
];

export const webFunctionalItems = [
  { id: 'Newsletter Form', label: 'Newsletter' },
  { id: 'Embedded Map', label: 'Google Map' },
  { id: 'Floating WhatsApp', label: 'Floating WA' },
  { id: 'Language Switcher', label: 'ID/EN Switch' },
];

export const webPlatforms = ['Scalev', 'WordPress'];

// ==================== LINK BIO OPTIONS ====================
export const bioLayoutOptions = [
  ['Standard List (Default)', 'Standard List (Tumpuk ke bawah)'],
  ['Grid Cards (Kotak-kotak)', 'Grid Cards (Cocok untuk Produk/Katalog)'],
  ['Accordion Grouping (Bisa dibuka-tutup)', 'Accordion (Kategori Link)'],
];

export const bioPhotoShapes = ['Circle', 'Rounded Square', 'No Photo'];

export const bioBgTypeOptions = [
  ['Gradient (Default)', 'Gradient'], ['Solid Color', 'Solid Color'],
  ['Image Background', 'Image'], ['Video Background', 'Video'],
];

export const bioBtnShapes = ['Pill', 'Rounded', 'Outline', 'Square'];

export const bioAnimOptions = [
  ['Scale on Hover (Membesar)', 'Scale on Hover'], ['Glow Effect', 'Glow Effect'],
  ['Pulse / Heartbeat', 'Pulse / Heartbeat'], ['Wiggle / Shake', 'Wiggle / Shake'],
  ['None / Static', 'Static'],
];

export const bioFontOptions = [
  ['Modern Sans Serif (Default)', 'Modern Sans Serif'], ['Elegant Serif (Mewah)', 'Elegant Serif'],
  ['Monospace (Coding/Tech)', 'Monospace'], ['Handwriting (Personal/Fun)', 'Handwriting'],
];

export const bioPlatforms = ['Scalev', 'WordPress'];

// ==================== INITIAL FORM DATA ====================
export const initialLpData = {
  framework: 'AIDCA (Attention–Interest–Desire–Conviction–Action)',
  tone: 'Friendly & Conversational (Santai tapi sopan)',
  category_base: 'Digital (Ebook / Template)',
  category_custom: '',
  goal: 'Lead Generation (Kumpulin No. WA / Email)',
  awareness: 'Unaware',
  target_base: 'Advertiser (FB Ads / TikTok Ads User)',
  target_custom: '',
  pain_points: '',
  product_name: '',
  price_normal: '',
  price_promo: '',
  description: '',
  objections: '',
  has_bonus: false,
  bonus_details: '',
  cta_base: 'Beli Sekarang',
  cta_custom: '',
  scarcity_type: 'None',
  brand_color: 'Brand Orange (Vibrant)',
  color_custom: '',
  theme_override: 'Default',
  design_style: 'Apple Style',
  hero_type: 'Standard Image',
  sticky_mobile: false,
  sections: [],
  platform: 'Scalev',
};

export const initialWebData = {
  web_name: '', web_type: 'Company Profile (Jasa/Konsultan)', web_type_custom: '',
  web_tagline: '', web_seo: '', web_desc: '',
  web_problem: '', web_solution: '',
  web_hero_style: 'Split Screen (Kiri Teks, Kanan Gambar)',
  web_page_structure: 'Single Page (Scroll ke bawah)',
  web_target: 'Calon Pelanggan (B2C)', web_target_custom: '',
  web_tone: 'Professional & Formal', web_tone_custom: '',
  web_usp: '', web_year: '',
  web_ig: '', web_fb: '', web_tt: '', web_x: '', web_threads: '', web_yt: '', web_linkedin: '', web_wa: '',
  web_services: '', web_contact: '', web_cta: '',
  web_nav_style: 'Sticky',
  web_sections: ['Services', 'Contact', 'Footer'],
  web_functionals: [],
  web_brand_color: 'Neutral (White/Black/Gray)', web_color_custom: '',
  web_theme_override: 'Default',
  web_design_style: 'Apple Style',
  web_platform: 'Scalev',
};

export const initialBioData = {
  bio_name: '', bio_role: '', bio_desc: '',
  bio_ig: '', bio_fb: '', bio_tiktok: '', bio_x: '', bio_threads: '', bio_yt: '', bio_linkedin: '', bio_wa: '',
  bio_layout: 'Standard List (Default)', bio_main_link: '', bio_links: '',
  bio_photo_shape: 'Circle',
  bio_bg_type: 'Gradient (Default)', bio_bg_url: '',
  bio_btn_shape: 'Pill',
  bio_brand_color: 'Brand Orange (Vibrant)', bio_color_custom: '',
  bio_theme_override: 'Default',
  bio_design_style: 'Clean & Minimalist',
  bio_anim: 'Scale on Hover (Membesar)',
  bio_font: 'Modern Sans Serif (Default)',
  bio_video: '', bio_countdown: '', bio_music: '', bio_donation: '',
  bio_contact_form: false,
  bio_platform: 'Scalev',
};
