import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

import {
  brandColorOptions, designStyleOptions, themeOverrideOptions, shortThemeOverrideOptions,
  frameworkOptions, toneOptions, categoryOptions, goalOptions, awarenessOptions, targetOptions, ctaOptions, scarcityOptions, heroTypeOptions, lpSectionItems, lpPlatforms,
  webTypeOptions, webHeroStyleOptions, webPageStructureOptions, webTargetOptions, webToneOptions, webNavStyles, webSectionItems, webFunctionalItems, webPlatforms,
  bioLayoutOptions, bioPhotoShapes, bioBgTypeOptions, bioBtnShapes, bioAnimOptions, bioFontOptions, bioPlatforms,
  initialLpData, initialWebData, initialBioData
} from './generatorConfig';

import {
  generateLandingPagePrompt, generateWebsitePrompt, generateLinkBioPrompt
} from './promptGenerators';

/* ─── Helper: Chevron SVG ─── */
const ChevronIcon = () => (
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

/* ─── Helper: Grouped <select> ─── */
const GroupedSelect = ({ id, value, onChange, options, className, required }) => (
  <div className="relative">
    <select id={id} value={value} onChange={onChange} className={`${className} pr-10`}>
      {options.map(([groupLabel, items]) => (
        <optgroup key={groupLabel} label={groupLabel}>
          {items.map(([val, display]) => (
            <option key={val} value={val}>{display}</option>
          ))}
        </optgroup>
      ))}
    </select>
    <ChevronIcon />
  </div>
);

/* ─── Helper: Flat <select> ─── */
const FlatSelect = ({ id, value, onChange, options, className }) => (
  <div className="relative">
    <select id={id} value={value} onChange={onChange} className={`${className} pr-10`}>
      {options.map(([val, display]) => (
        <option key={val} value={val}>{display}</option>
      ))}
    </select>
    <ChevronIcon />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const GeneratorPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const outputRef = useRef(null);
  const fullPromptRef = useRef('');
  const streamIntervalRef = useRef(null);

  /* ── state ── */
  const [currentMode, setCurrentMode] = useState(null);
  const [showSelection, setShowSelection] = useState(true);
  const [isLoadingTransition, setIsLoadingTransition] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [lpData, setLpData] = useState(initialLpData);
  const [webData, setWebData] = useState(initialWebData);
  const [bioData, setBioData] = useState(initialBioData);

  const [generatedPrompt, setGeneratedPrompt] = useState('Pilih jenis halaman terlebih dahulu...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showValidationMsg, setShowValidationMsg] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    return () => { if (streamIntervalRef.current) clearInterval(streamIntervalRef.current); };
  }, []);

  /* ── theme init ── */
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.classList.toggle('dark', saved === 'dark');
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  /* ── toast ── */
  const showToast = (message, type = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== id)); }, 3000);
  };

  /* ── logout ── */
  const handleLogout = async () => {
    try { await signOut(); navigate('/login'); } catch (e) { console.error('Logout failed', e); }
  };

  /* ── transition ── */
  const startTransition = (mode) => {
    setIsLoadingTransition(true);
    setLoadingProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentMode(mode);
          setShowSelection(false);
          setIsLoadingTransition(false);
          setGeneratedPrompt('Lengkapi formulir di sebelah kiri untuk meracik prompt Anda...');
        }, 200);
      }
    }, 24);
  };

  const goBack = () => {
    setCurrentMode(null);
    setShowSelection(true);
    setGeneratedPrompt('Pilih jenis halaman terlebih dahulu...');
    setShowValidationMsg(false);
  };

  /* ── handlers ── */
  const handleLp = (e) => {
    const { id, name, value, type, checked } = e.target;
    const group = e.target.dataset.group;
    if (type === 'checkbox' && group) {
      setLpData(prev => ({ ...prev, [group]: checked ? [...prev[group], value] : prev[group].filter(s => s !== value) }));
    } else if (type === 'checkbox') {
      setLpData(prev => ({ ...prev, [id]: checked }));
    } else if (type === 'radio') {
      setLpData(prev => ({ ...prev, [name]: value }));
    } else {
      setLpData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleWeb = (e) => {
    const { id, name, value, type, checked } = e.target;
    const group = e.target.dataset.group;
    if (type === 'checkbox' && group) {
      setWebData(prev => ({ ...prev, [group]: checked ? [...prev[group], value] : prev[group].filter(s => s !== value) }));
    } else if (type === 'radio') {
      setWebData(prev => ({ ...prev, [name]: value }));
    } else {
      setWebData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleBio = (e) => {
    const { id, name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setBioData(prev => ({ ...prev, [id]: checked }));
    } else if (type === 'radio') {
      setBioData(prev => ({ ...prev, [name]: value }));
    } else {
      setBioData(prev => ({ ...prev, [id]: value }));
    }
  };

  /* ── validation ── */
  const validateLP = () => {
    const d = lpData;
    let valid = true;
    if (!d.framework || !d.tone || !d.product_name || !d.description || !d.design_style || !d.brand_color || !d.cta_base || !d.goal || !d.category_base || !d.target_base || !d.awareness) valid = false;
    if (d.category_base === 'custom' && !d.category_custom.trim()) valid = false;
    if (d.target_base === 'custom' && !d.target_custom.trim()) valid = false;
    if (d.cta_base === 'custom' && !d.cta_custom.trim()) valid = false;
    if (d.brand_color === 'custom' && !d.color_custom.trim()) valid = false;
    return valid;
  };

  const validateWeb = () => {
    const d = webData;
    let valid = true;
    if (!d.web_name || !d.web_desc || !d.web_design_style || !d.web_brand_color) valid = false;
    if (d.web_type === 'custom' && !d.web_type_custom.trim()) valid = false;
    if (d.web_target === 'custom' && !d.web_target_custom.trim()) valid = false;
    if (d.web_tone === 'custom' && !d.web_tone_custom.trim()) valid = false;
    if (d.web_brand_color === 'custom' && !d.web_color_custom.trim()) valid = false;
    return valid;
  };

  const validateBio = () => {
    const d = bioData;
    let valid = true;
    if (!d.bio_name || !d.bio_role || !d.bio_desc || !d.bio_design_style || !d.bio_brand_color || !d.bio_links) valid = false;
    if (d.bio_brand_color === 'custom' && !d.bio_color_custom.trim()) valid = false;
    return valid;
  };

  /* ── generate (streaming text effect) ── */
  const handleGenerate = () => {
    let valid = false;
    if (currentMode === 'landing-page') valid = validateLP();
    else if (currentMode === 'website') valid = validateWeb();
    else if (currentMode === 'link-bio') valid = validateBio();

    setShowValidationMsg(!valid);
    if (!valid) {
      const msg = document.getElementById('validation-msg');
      if (msg) msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    setIsGenerating(true);
    setIsStreaming(false);
    setGeneratedPrompt('Sedang meracik prompt...');

    setTimeout(() => {
      let prompt = '';
      if (currentMode === 'landing-page') prompt = generateLandingPagePrompt(lpData);
      else if (currentMode === 'website') prompt = generateWebsitePrompt(webData);
      else if (currentMode === 'link-bio') prompt = generateLinkBioPrompt(bioData);

      fullPromptRef.current = prompt;
      setGeneratedPrompt('');
      setIsStreaming(true);

      let idx = 0;
      const chunkSize = 4;
      streamIntervalRef.current = setInterval(() => {
        idx += chunkSize;
        if (idx >= prompt.length) {
          setGeneratedPrompt(prompt);
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
          setIsStreaming(false);
          setIsGenerating(false);
        } else {
          setGeneratedPrompt(prompt.slice(0, idx));
        }
        const el = outputRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      }, 8);

      if (window.innerWidth < 1024) outputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  /* ── copy & open ── */
  const getFullPrompt = () => fullPromptRef.current || generatedPrompt;

  const copyPrompt = () => {
    const text = getFullPrompt();
    if (text.includes('Lengkapi formulir') || text.includes('Sedang meracik') || text.includes('Pilih jenis')) return;
    navigator.clipboard.writeText(text);
    showToast('Prompt tersalin!', 'success');
  };

  const goToGPT = () => {
    const text = getFullPrompt();
    if (text.includes('Lengkapi formulir') || text.includes('Sedang meracik') || text.includes('Pilih jenis')) return;
    const encoded = encodeURIComponent(text);
    window.open(`https://chat.openai.com/?q=${encoded}`, '_blank');
  };

  /* ── reset ── */
  const handleReset = () => { setIsConfirmOpen(true); };
  const confirmReset = () => {
    if (streamIntervalRef.current) { clearInterval(streamIntervalRef.current); streamIntervalRef.current = null; }
    if (currentMode === 'landing-page') { setLpData(initialLpData); }
    else if (currentMode === 'website') { setWebData(initialWebData); }
    else if (currentMode === 'link-bio') { setBioData(initialBioData); }
    fullPromptRef.current = '';
    setIsStreaming(false);
    setIsGenerating(false);
    setGeneratedPrompt('Lengkapi formulir di sebelah kiri untuk meracik prompt Anda...');
    setIsConfirmOpen(false);
    showToast('Data formulir berhasil direset', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── class constants ── */
  const cardClass = 'glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden';
  const labelClass = 'text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider';
  const inputClass = 'w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 bg-white border border-slate-200 text-slate-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:bg-[#030712]/60 dark:border-gray-800 dark:text-slate-100 dark:focus:border-orange-500';
  const selectClass = inputClass + ' appearance-none cursor-pointer';

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen pb-20 selection:bg-orange-500 selection:text-white font-sans bg-slate-50 text-slate-900 dark:bg-[#0B0F19] dark:text-slate-200 transition-colors duration-300">
      <Toast toasts={toasts} />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Reset Formulir?"
        message="Tindakan ini akan menghapus semua data yang sudah Anda isi dan prompt yang sudah digenerate. Anda yakin?"
        onConfirm={confirmReset}
        onCancel={() => setIsConfirmOpen(false)}
      />

      {/* ══════════ LOADING OVERLAY ══════════ */}
      {isLoadingTransition && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B0F19] transition-opacity">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SESUAIFORMAT.ID</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Bantu Bisnis Digital Mu</p>
          <div className="progress-track"><div className="progress-bar-fill" style={{ width: `${loadingProgress}%` }}></div></div>
        </div>
      )}

      {/* ══════════ NAVBAR ══════════ */}
      <nav className="fixed w-full z-50 backdrop-blur-md transition-all bg-white/85 border-b border-black/5 dark:bg-[#0B0F19]/85 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm p-2">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  {!currentMode && <>Web<span className="text-orange-500">Engine</span></>}
                  {currentMode === 'landing-page' && <>Landing Page<span className="text-orange-500"> Engine</span></>}
                  {currentMode === 'website' && <>Website<span className="text-orange-500"> Engine</span></>}
                  {currentMode === 'link-bio' && <>Link Bio<span className="text-orange-500"> Engine</span></>}
                </h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">By SesuaiFormat.id</p>
              </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-2">
              {currentMode && (
                <button onClick={goBack} className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-all cursor-pointer" title="Kembali">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
              )}
              <button onClick={toggleTheme} className="cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 dark:bg-white/5 dark:border-orange-500/50 dark:text-orange-500 dark:hover:bg-orange-500 dark:hover:text-white">
                <svg className="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <svg className="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              </button>
              <button onClick={handleLogout} className="hidden sm:block cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-white/5 dark:border-red-900/50 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white" title="Keluar">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8">

        {/* ══════════ SELECTION SCREEN ══════════ */}
        {showSelection && !currentMode && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-default bg-orange-100 border border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Multi-Platform Generator
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                Mau bikin apa<br className="hidden md:block" />
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent"> hari ini?</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light text-slate-600 dark:text-slate-400">
                Pilih jenis halaman yang ingin Anda buat, kami bantu susun struktur konten yang profesional dan menjual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card: Landing Page */}
              <button onClick={() => startTransition('landing-page')} className="selection-card group text-left glass-card rounded-3xl p-8 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border border-slate-200/50 dark:border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Landing Page</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Buat sales page yang persuasif dengan framework copywriting terbukti konversi.</p>
              </button>

              {/* Card: Website */}
              <button onClick={() => startTransition('website')} className="selection-card group text-left glass-card rounded-3xl p-8 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border border-slate-200/50 dark:border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Website</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Susun Company Profile atau Portfolio yang profesional dan kredibel.</p>
              </button>

              {/* Card: Link Bio */}
              <button onClick={() => startTransition('link-bio')} className="selection-card group text-left glass-card rounded-3xl p-8 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl border border-slate-200/50 dark:border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Link Bio</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Desain micro-site link in bio yang modern dan eye-catching.</p>
              </button>
            </div>
          </div>
        )}

        {/* ══════════ FORMS CONTAINER ══════════ */}
        {currentMode && !showSelection && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-default bg-orange-100 border border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                {currentMode === 'landing-page' && 'Landing Page Builder'}
                {currentMode === 'website' && 'Website Builder'}
                {currentMode === 'link-bio' && 'Link Bio Builder'}
              </div>

              {currentMode === 'landing-page' && (
                <>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                    Buat Landing Page professional cuman dalam<br className="hidden md:block" />
                    <span className="text-gradient"> Hitungan menit</span>
                  </h1>
                  <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light text-slate-600 dark:text-slate-400">
                    Generate Landing Page dari format yang benar.
                  </p>
                </>
              )}
              {currentMode === 'website' && (
                <>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                    Bangun Website Impian <span className="text-gradient">Tanpa Ribet</span>
                  </h1>
                  <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light text-slate-600 dark:text-slate-400">
                    Struktur yang rapi bikin brandmu kelihatan profesional.
                  </p>
                </>
              )}
              {currentMode === 'link-bio' && (
                <>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                    Bio Page yang Bikin Pengunjung <span className="text-gradient">Klik Terus</span>
                  </h1>
                  <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light text-slate-600 dark:text-slate-400">
                    Jangan biarkan linkmu tersesat.
                  </p>
                </>
              )}
            </div>

            {/* Grid: Left forms + Right output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* ──────── LEFT COLUMN: FORMS ──────── */}
              <section className="lg:col-span-7 animate-fade-in">

                {/* ═══════════════════════════════════════
                   LANDING PAGE FORM
                   ═══════════════════════════════════════ */}
                {currentMode === 'landing-page' && (
                  <div className="space-y-8">
                    {/* LP Section 1 - Framework & Tone */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">1</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Framework & Tone</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tentukan struktur psikologi dan gaya bahasa copywriting.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Pilih Framework <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="framework" value={lpData.framework} onChange={handleLp} options={frameworkOptions} className={selectClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Gaya Bahasa <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="tone" value={lpData.tone} onChange={handleLp} options={toneOptions} className={selectClass} />
                        </div>
                      </div>
                    </div>

                    {/* LP Section 2 - Produk & Tujuan */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">2</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Produk & Tujuan</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Apa yang Anda jual dan apa goal utamanya?</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Tipe Produk <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="category_base" value={lpData.category_base} onChange={handleLp} options={categoryOptions} className={selectClass} />
                          {lpData.category_base === 'custom' && (
                            <input type="text" id="category_custom" value={lpData.category_custom} onChange={handleLp} placeholder="Tulis kategori produk..." className={`${inputClass} mt-3`} />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Tujuan Utama <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="goal" value={lpData.goal} onChange={handleLp} options={goalOptions} className={selectClass} />
                        </div>
                      </div>
                    </div>

                    {/* LP Section 3 - Target Market */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">3</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Target Market</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Siapa audiens Anda?</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>Level Awareness <span className="text-orange-500">*</span></label>
                          <FlatSelect id="awareness" value={lpData.awareness} onChange={handleLp} options={awarenessOptions} className={selectClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Target Audience <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="target_base" value={lpData.target_base} onChange={handleLp} options={targetOptions} className={selectClass} />
                          {lpData.target_base === 'custom' && (
                            <input type="text" id="target_custom" value={lpData.target_custom} onChange={handleLp} placeholder="Siapa spesifik target market?" className={`${inputClass} mt-3`} />
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 mt-6">
                        <label className={labelClass}>Pain Points</label>
                        <textarea id="pain_points" rows="3" value={lpData.pain_points} onChange={handleLp} placeholder="Apa ketakutan/masalah utama target Anda?" className={inputClass}></textarea>
                      </div>
                    </div>

                    {/* LP Section 4 - Detail Produk & Copy */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">4</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Detail Produk & Copy</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Penawaran dan copywriting utama.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Nama Produk <span className="text-orange-500">*</span></label>
                            <input type="text" id="product_name" value={lpData.product_name} onChange={handleLp} placeholder="Contoh: Masterclass Copywriting" className={inputClass} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className={labelClass}>Harga Normal</label>
                              <input type="text" id="price_normal" value={lpData.price_normal} onChange={handleLp} placeholder="Rp 999.000" className={inputClass} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelClass}>Harga Promo</label>
                              <input type="text" id="price_promo" value={lpData.price_promo} onChange={handleLp} placeholder="Rp 499.000" className={inputClass} />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Deskripsi & Benefit <span className="text-orange-500">*</span></label>
                          <textarea id="description" rows="4" value={lpData.description} onChange={handleLp} placeholder="Jelaskan keunggulan produk..." className={inputClass}></textarea>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Objections / Alasan Ragu</label>
                          <textarea id="objections" rows="3" value={lpData.objections} onChange={handleLp} placeholder="Alasan terbesar target Anda TIDAK jadi beli?" className={inputClass}></textarea>
                        </div>
                        {/* Bonus toggle */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="has_bonus" checked={lpData.has_bonus} onChange={handleLp} className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                            <span className={labelClass}>Ada Bonus / Value Stack?</span>
                          </label>
                          {lpData.has_bonus && (
                            <textarea id="bonus_details" rows="3" value={lpData.bonus_details} onChange={handleLp} placeholder="Detail bonus yang ditawarkan..." className={inputClass}></textarea>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Call To Action <span className="text-orange-500">*</span></label>
                            <FlatSelect id="cta_base" value={lpData.cta_base} onChange={handleLp} options={ctaOptions} className={selectClass} />
                            {lpData.cta_base === 'custom' && (
                              <input type="text" id="cta_custom" value={lpData.cta_custom} onChange={handleLp} placeholder="Teks tombol custom..." className={`${inputClass} mt-3`} />
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Scarcity Type</label>
                            <FlatSelect id="scarcity_type" value={lpData.scarcity_type} onChange={handleLp} options={scarcityOptions} className={selectClass} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LP Section 5 - Elemen Tambahan */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">5</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Elemen Tambahan</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pilih section apa saja yang ingin ditampilkan.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {lpSectionItems.map(([val, lbl]) => (
                          <div key={val} className="relative group">
                            <input type="checkbox" id={`sec_${val}`} value={val} checked={lpData.sections.includes(val)} onChange={handleLp} className="hidden section-checkbox" data-group="sections" />
                            <label htmlFor={`sec_${val}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl cursor-pointer select-none">{lbl}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LP Section 6 - Identitas Visual & Desain */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">6</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Identitas Visual & Desain</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Warna, hero type, dan gaya visual.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Warna Brand <span className="text-orange-500">*</span></label>
                            <GroupedSelect id="brand_color" value={lpData.brand_color} onChange={handleLp} options={brandColorOptions} className={selectClass} />
                            {lpData.brand_color === 'custom' && (
                              <input type="text" id="color_custom" value={lpData.color_custom} onChange={handleLp} placeholder="#Hex atau Nama Warna" className={`${inputClass} mt-3`} />
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Tema Background</label>
                            <FlatSelect id="theme_override" value={lpData.theme_override} onChange={handleLp} options={themeOverrideOptions} className={selectClass} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Gaya Desain <span className="text-orange-500">*</span></label>
                            <GroupedSelect id="design_style" value={lpData.design_style} onChange={handleLp} options={designStyleOptions} className={selectClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Hero Section Type</label>
                            <FlatSelect id="hero_type" value={lpData.hero_type} onChange={handleLp} options={heroTypeOptions} className={selectClass} />
                          </div>
                        </div>
                        <div className="space-y-2 flex items-end">
                          <label className="flex items-center gap-3 cursor-pointer pb-3">
                            <input type="checkbox" id="sticky_mobile" checked={lpData.sticky_mobile} onChange={handleLp} className="w-5 h-5 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                            <span className={labelClass}>Sticky Mobile CTA</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* LP Section 7 - Platform Target */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">7</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Target</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pilih platform deploy.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {lpPlatforms.map(p => (
                          <div key={p} className="relative">
                            <input type="radio" name="platform" id={`lp_plt_${p}`} value={p} checked={lpData.platform === p} onChange={handleLp} className="hidden peer" />
                            <label htmlFor={`lp_plt_${p}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                              {p}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════
                   WEBSITE FORM
                   ═══════════════════════════════════════ */}
                {currentMode === 'website' && (
                  <div className="space-y-8">
                    {/* Web Section 1 - Identitas Website */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">1</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Identitas Website</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Informasi dasar brand dan website.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Nama Brand <span className="text-orange-500">*</span></label>
                            <input type="text" id="web_name" value={webData.web_name} onChange={handleWeb} placeholder="Contoh: PT Maju Bersama" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Tipe Website</label>
                            <FlatSelect id="web_type" value={webData.web_type} onChange={handleWeb} options={webTypeOptions} className={selectClass} />
                            {webData.web_type === 'custom' && (
                              <input type="text" id="web_type_custom" value={webData.web_type_custom} onChange={handleWeb} placeholder="Tipe website custom..." className={`${inputClass} mt-3`} />
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Tagline</label>
                            <input type="text" id="web_tagline" value={webData.web_tagline} onChange={handleWeb} placeholder="Tagline brand Anda" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>SEO Keywords</label>
                            <input type="text" id="web_seo" value={webData.web_seo} onChange={handleWeb} placeholder="Keyword utama (pisahkan koma)" className={inputClass} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Deskripsi Singkat <span className="text-orange-500">*</span></label>
                          <textarea id="web_desc" rows="4" value={webData.web_desc} onChange={handleWeb} placeholder="Jelaskan brand / bisnis Anda secara detail..." className={inputClass}></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Web Section 2 - Konten & Struktur Detail */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">2</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Konten & Struktur Detail</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Deskripsi, masalah, dan solusi brand.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Masalah Klien</label>
                            <textarea id="web_problem" rows="3" value={webData.web_problem} onChange={handleWeb} placeholder="Masalah apa yang brand Anda selesaikan?" className={inputClass}></textarea>
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Solusi Anda</label>
                            <textarea id="web_solution" rows="3" value={webData.web_solution} onChange={handleWeb} placeholder="Solusi apa yang Anda tawarkan?" className={inputClass}></textarea>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Gaya Hero Section</label>
                            <FlatSelect id="web_hero_style" value={webData.web_hero_style} onChange={handleWeb} options={webHeroStyleOptions} className={selectClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Struktur Halaman</label>
                            <FlatSelect id="web_page_structure" value={webData.web_page_structure} onChange={handleWeb} options={webPageStructureOptions} className={selectClass} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Web Section 3 - Audiens & Gaya Bahasa */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">3</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Audiens & Gaya Bahasa</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Target pengunjung dan tone.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className={labelClass}>Target Pengunjung</label>
                          <FlatSelect id="web_target" value={webData.web_target} onChange={handleWeb} options={webTargetOptions} className={selectClass} />
                          {webData.web_target === 'custom' && (
                            <input type="text" id="web_target_custom" value={webData.web_target_custom} onChange={handleWeb} placeholder="Target pengunjung custom..." className={`${inputClass} mt-3`} />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Tone of Voice</label>
                          <FlatSelect id="web_tone" value={webData.web_tone} onChange={handleWeb} options={webToneOptions} className={selectClass} />
                          {webData.web_tone === 'custom' && (
                            <input type="text" id="web_tone_custom" value={webData.web_tone_custom} onChange={handleWeb} placeholder="Tone custom..." className={`${inputClass} mt-3`} />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Web Section 4 - Brand Assets & Sosial Media */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">4</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Brand Assets & Socials</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">USP, tahun berdiri, dan link sosial media.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className={labelClass}>USP (Unique Selling Proposition)</label>
                          <textarea id="web_usp" rows="2" value={webData.web_usp} onChange={handleWeb} placeholder="Apa keunikan brand Anda?" className={inputClass}></textarea>
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Tahun Berdiri</label>
                            <input type="text" id="web_year" value={webData.web_year} onChange={handleWeb} placeholder="Contoh: 2020" className={inputClass} />
                          </div>
                        </div>
                        <p className={`${labelClass} mt-2`}>Social Media Links</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" id="web_ig" value={webData.web_ig} onChange={handleWeb} placeholder="Instagram URL" className={inputClass} />
                          <input type="text" id="web_fb" value={webData.web_fb} onChange={handleWeb} placeholder="Facebook URL" className={inputClass} />
                          <input type="text" id="web_tt" value={webData.web_tt} onChange={handleWeb} placeholder="TikTok URL" className={inputClass} />
                          <input type="text" id="web_x" value={webData.web_x} onChange={handleWeb} placeholder="X (Twitter) URL" className={inputClass} />
                          <input type="text" id="web_threads" value={webData.web_threads} onChange={handleWeb} placeholder="Threads URL" className={inputClass} />
                          <input type="text" id="web_yt" value={webData.web_yt} onChange={handleWeb} placeholder="YouTube URL" className={inputClass} />
                          <input type="text" id="web_linkedin" value={webData.web_linkedin} onChange={handleWeb} placeholder="LinkedIn URL" className={inputClass} />
                          <input type="text" id="web_wa" value={webData.web_wa} onChange={handleWeb} placeholder="WhatsApp Number" className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {/* Web Section 5 - Konten & Kontak */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">5</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Konten & Kontak</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Layanan, kontak, dan CTA utama.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className={labelClass}>Layanan Utama</label>
                          <textarea id="web_services" rows="3" value={webData.web_services} onChange={handleWeb} placeholder="List layanan / produk utama..." className={inputClass}></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Info Kontak</label>
                            <input type="text" id="web_contact" value={webData.web_contact} onChange={handleWeb} placeholder="Alamat, telepon, email..." className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Primary CTA</label>
                            <input type="text" id="web_cta" value={webData.web_cta} onChange={handleWeb} placeholder="Contoh: Hubungi Kami" className={inputClass} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Web Section 6 - Struktur & Fitur */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">6</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Struktur & Fitur</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Navigasi, sections, dan elemen fungsional.</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {/* Nav Style */}
                        <div className="space-y-2">
                          <label className={labelClass}>Navigation Style</label>
                          <div className="grid grid-cols-3 gap-3">
                            {webNavStyles.map(ns => (
                              <div key={ns} className="relative">
                                <input type="radio" name="web_nav_style" id={`wnav_${ns}`} value={ns} checked={webData.web_nav_style === ns} onChange={handleWeb} className="hidden peer" />
                                <label htmlFor={`wnav_${ns}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-12 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                                  {ns}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Sections */}
                        <div className="space-y-2">
                          <label className={labelClass}>Sections</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {webSectionItems.map(item => (
                              <div key={item.id} className="relative group">
                                <input
                                  type="checkbox"
                                  id={`wsec_${item.id}`}
                                  value={item.id}
                                  onChange={handleWeb}
                                  checked={item.locked ? true : webData.web_sections.includes(item.id)}
                                  disabled={item.locked}
                                  className="hidden section-checkbox-web peer"
                                  data-group="web_sections"
                                />
                                <label htmlFor={`wsec_${item.id}`} className={`flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-50 peer-checked:border-orange-500 peer-checked:text-orange-700 dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white ${item.locked ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                  {item.label}{item.locked ? ' (Locked)' : ''}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Functional Elements */}
                        <div className="space-y-2">
                          <label className={labelClass}>Elemen Fungsional</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {webFunctionalItems.map(item => (
                              <div key={item.id} className="relative group">
                                <input
                                  type="checkbox"
                                  id={`wfunc_${item.id}`}
                                  value={item.id}
                                  onChange={handleWeb}
                                  checked={webData.web_functionals.includes(item.id)}
                                  className="hidden section-checkbox-web peer"
                                  data-group="web_functionals"
                                />
                                <label htmlFor={`wfunc_${item.id}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-50 peer-checked:border-orange-500 peer-checked:text-orange-700 dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Web Section 7 - Identitas Visual & Desain */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">7</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Identitas Visual & Desain</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Warna, tema, dan gaya visual.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Warna Brand <span className="text-orange-500">*</span></label>
                            <GroupedSelect id="web_brand_color" value={webData.web_brand_color} onChange={handleWeb} options={brandColorOptions} className={selectClass} />
                            {webData.web_brand_color === 'custom' && (
                              <input type="text" id="web_color_custom" value={webData.web_color_custom} onChange={handleWeb} placeholder="#Hex atau Nama Warna" className={`${inputClass} mt-3`} />
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Tema Background</label>
                            <FlatSelect id="web_theme_override" value={webData.web_theme_override} onChange={handleWeb} options={shortThemeOverrideOptions} className={selectClass} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Gaya Desain <span className="text-orange-500">*</span></label>
                          <GroupedSelect id="web_design_style" value={webData.web_design_style} onChange={handleWeb} options={designStyleOptions} className={selectClass} />
                        </div>
                      </div>
                    </div>

                    {/* Web Section 8 - Platform Target */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">8</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Target</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pilih platform deploy.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {webPlatforms.map(p => (
                          <div key={p} className="relative">
                            <input type="radio" name="web_platform" id={`web_plt_${p}`} value={p} checked={webData.web_platform === p} onChange={handleWeb} className="hidden peer" />
                            <label htmlFor={`web_plt_${p}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                              {p}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════
                   LINK BIO FORM
                   ═══════════════════════════════════════ */}
                {currentMode === 'link-bio' && (
                  <div className="space-y-8">
                    {/* Bio Section 1 - Profil & Brand */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">1</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profil & Brand</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Informasi dasar profil Anda.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Nama <span className="text-orange-500">*</span></label>
                            <input type="text" id="bio_name" value={bioData.bio_name} onChange={handleBio} placeholder="Nama Anda / Brand" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Role / Title <span className="text-orange-500">*</span></label>
                            <input type="text" id="bio_role" value={bioData.bio_role} onChange={handleBio} placeholder="Contoh: Content Creator" className={inputClass} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Bio Singkat <span className="text-orange-500">*</span></label>
                          <textarea id="bio_desc" rows="3" value={bioData.bio_desc} onChange={handleBio} placeholder="Deskripsikan diri Anda dalam 1-2 kalimat..." className={inputClass}></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 2 - Social Media Bar */}
                    <div className={`${cardClass} border-dashed`}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">2</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Social Media Bar</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Link sosial media yang ditampilkan.</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-4 bg-slate-100 dark:bg-white/5 p-3 rounded-lg">Opsional: Kosongkan jika tidak perlu.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className={labelClass}>Instagram</label>
                          <input type="text" id="bio_ig" value={bioData.bio_ig} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Facebook</label>
                          <input type="text" id="bio_fb" value={bioData.bio_fb} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>TikTok</label>
                          <input type="text" id="bio_tiktok" value={bioData.bio_tiktok} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>X / Twitter</label>
                          <input type="text" id="bio_x" value={bioData.bio_x} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Threads</label>
                          <input type="text" id="bio_threads" value={bioData.bio_threads} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>YouTube</label>
                          <input type="text" id="bio_yt" value={bioData.bio_yt} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>LinkedIn</label>
                          <input type="text" id="bio_linkedin" value={bioData.bio_linkedin} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>WhatsApp</label>
                          <input type="text" id="bio_wa" value={bioData.bio_wa} onChange={handleBio} placeholder="@username" className={inputClass} />
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 3 - Link & Layout */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">3</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Link & Layout</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Atur layout dan daftar link.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className={labelClass}>Link Layout</label>
                          <FlatSelect id="bio_layout" value={bioData.bio_layout} onChange={handleBio} options={bioLayoutOptions} className={selectClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Highlight Link</label>
                          <input type="text" id="bio_main_link" value={bioData.bio_main_link} onChange={handleBio} placeholder="Link utama yang di-highlight" className={inputClass} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>List Link <span className="text-orange-500">*</span></label>
                          <div className="mb-3 p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-white/10 text-[11px] text-slate-500 leading-relaxed">
                            <span className="font-bold text-orange-500">CONTOH PENGISIAN:</span><br />
                            Katalog Produk : https://website.com/katalog<br />
                            Admin WhatsApp : https://wa.me/62812xxx<br />
                            Join Telegram : https://t.me/channel
                          </div>
                          <textarea id="bio_links" rows="5" value={bioData.bio_links} onChange={handleBio} placeholder="Satu link per baris..." className={`${inputClass} font-mono text-xs`}></textarea>
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 4 - Profile Visuals */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">4</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Visuals</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Foto profil, background, dan tombol.</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {/* Photo Shape */}
                        <div className="space-y-2">
                          <label className={labelClass}>Bentuk Foto Profil</label>
                          <div className="grid grid-cols-3 gap-3">
                            {bioPhotoShapes.map(shape => (
                              <div key={shape} className="relative">
                                <input type="radio" name="bio_photo_shape" id={`bps_${shape}`} value={shape} checked={bioData.bio_photo_shape === shape} onChange={handleBio} className="hidden peer" />
                                <label htmlFor={`bps_${shape}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-12 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                                  {shape}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Background Style */}
                        <div className="space-y-2">
                          <label className={labelClass}>Background Style</label>
                          <FlatSelect id="bio_bg_type" value={bioData.bio_bg_type} onChange={handleBio} options={bioBgTypeOptions} className={selectClass} />
                          {(bioData.bio_bg_type === 'Image Background' || bioData.bio_bg_type === 'Video Background') && (
                            <input type="text" id="bio_bg_url" value={bioData.bio_bg_url} onChange={handleBio} placeholder="URL gambar / video background" className={`${inputClass} mt-3`} />
                          )}
                        </div>
                        {/* Button Shape */}
                        <div className="space-y-2">
                          <label className={labelClass}>Bentuk Tombol</label>
                          <div className="grid grid-cols-4 gap-3">
                            {bioBtnShapes.map(shape => (
                              <div key={shape} className="relative">
                                <input type="radio" name="bio_btn_shape" id={`bbs_${shape}`} value={shape} checked={bioData.bio_btn_shape === shape} onChange={handleBio} className="hidden peer" />
                                <label htmlFor={`bbs_${shape}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-12 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                                  {shape}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 5 - Identitas Visual & Desain */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">5</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Identitas Visual & Desain</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Warna, tema, gaya desain, animasi, dan font.</p>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Warna Brand <span className="text-orange-500">*</span></label>
                            <GroupedSelect id="bio_brand_color" value={bioData.bio_brand_color} onChange={handleBio} options={brandColorOptions} className={selectClass} />
                            {bioData.bio_brand_color === 'custom' && (
                              <input type="text" id="bio_color_custom" value={bioData.bio_color_custom} onChange={handleBio} placeholder="#Hex atau Nama Warna" className={`${inputClass} mt-3`} />
                            )}
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Tema Background</label>
                            <FlatSelect id="bio_theme_override" value={bioData.bio_theme_override} onChange={handleBio} options={shortThemeOverrideOptions} className={selectClass} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Gaya Desain <span className="text-orange-500">*</span></label>
                            <GroupedSelect id="bio_design_style" value={bioData.bio_design_style} onChange={handleBio} options={designStyleOptions} className={selectClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Animasi Tombol <span className="text-orange-500">*</span></label>
                            <FlatSelect id="bio_anim" value={bioData.bio_anim} onChange={handleBio} options={bioAnimOptions} className={selectClass} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>Jenis Font (Typography) <span className="text-orange-500">*</span></label>
                          <FlatSelect id="bio_font" value={bioData.bio_font} onChange={handleBio} options={bioFontOptions} className={selectClass} />
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 6 - Featured Content */}
                    <div className={`${cardClass} border-dashed`}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">6</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Featured Content (Opsional)</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Widget dan konten tambahan.</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-4 bg-slate-100 dark:bg-white/5 p-3 rounded-lg">Kosongkan jika tidak perlu.</p>
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className={labelClass}>Video Embed URL</label>
                            <input type="text" id="bio_video" value={bioData.bio_video} onChange={handleBio} placeholder="URL video YouTube/Vimeo" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Countdown Text</label>
                            <input type="text" id="bio_countdown" value={bioData.bio_countdown} onChange={handleBio} placeholder="Contoh: Flash Sale berakhir!" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Music Embed URL</label>
                            <input type="text" id="bio_music" value={bioData.bio_music} onChange={handleBio} placeholder="URL Spotify/Apple Music" className={inputClass} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClass}>Donation Text</label>
                            <input type="text" id="bio_donation" value={bioData.bio_donation} onChange={handleBio} placeholder="Teks untuk tombol donasi" className={inputClass} />
                          </div>
                        </div>
                        <div className="mt-4 relative group">
                          <input type="checkbox" id="bio_contact_form" value="Contact Form" checked={bioData.bio_contact_form} onChange={handleBio} className="hidden section-checkbox-bio" />
                          <label htmlFor="bio_contact_form" className="flex flex-col items-center justify-center text-center text-xs font-bold h-12 rounded-xl cursor-pointer select-none">Tambahkan Form Kontak Langsung</label>
                        </div>
                      </div>
                    </div>

                    {/* Bio Section 7 - Platform Target */}
                    <div className={cardClass}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="step-badge w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">7</span>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Target</h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pilih platform deploy.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {bioPlatforms.map(p => (
                          <div key={p} className="relative">
                            <input type="radio" name="bio_platform" id={`bio_plt_${p}`} value={p} checked={bioData.bio_platform === p} onChange={handleBio} className="hidden peer" />
                            <label htmlFor={`bio_plt_${p}`} className="flex flex-col items-center justify-center text-center text-xs font-bold h-14 rounded-xl border cursor-pointer transition-all select-none border-slate-200 bg-white text-slate-600 hover:border-orange-500/50 peer-checked:bg-orange-600 peer-checked:border-orange-500 peer-checked:text-white dark:border-[#2d294a] dark:bg-[#0f121e] dark:text-slate-400 dark:peer-checked:bg-orange-600 dark:peer-checked:border-orange-500 dark:peer-checked:text-white">
                              {p}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ══════════ VALIDATION + BUTTONS ══════════ */}
                {showValidationMsg && (
                  <div id="validation-msg" className="bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-200 px-6 py-4 rounded-2xl text-sm font-medium flex items-center gap-3 backdrop-blur-sm">
                    <svg className="h-5 w-5 text-red-500 dark:text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Mohon lengkapi semua kolom bertanda (Wajib) agar prompt akurat.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                  <button onClick={handleReset} className="col-span-1 border border-slate-300 text-slate-500 hover:bg-slate-50 dark:border-[#2d294a] dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 font-bold py-5 rounded-3xl transition-all cursor-pointer">
                    Reset
                  </button>
                  <button onClick={handleGenerate} disabled={isGenerating} className="col-span-2 btn-gradient text-white font-extrabold py-5 rounded-3xl shadow-xl hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed">
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <span>
                          {currentMode === 'landing-page' && 'Generate Prompt'}
                          {currentMode === 'website' && 'Generate Website Prompt'}
                          {currentMode === 'link-bio' && 'Generate Bio Prompt'}
                        </span>
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </>
                    )}
                  </button>
                </div>
              </section>

              {/* ──────── RIGHT COLUMN: OUTPUT ──────── */}
              <section className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4 animate-[fadeIn_0.5s_ease-out]">
                <div className="rounded-[2.5rem] p-1 shadow-2xl flex flex-col h-[750px] border transition-all duration-300 border-white/40 bg-white dark:border-white/10 dark:bg-gray-900/50 backdrop-blur-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-8 py-6 border-b rounded-t-[2.3rem] border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-white/5">
                    <div className="flex flex-col">
                      <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Result</span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white">AI Prompt Output</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <button onClick={copyPrompt} className="bg-orange-500 text-white border border-transparent hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 text-xs px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 cursor-pointer">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        Salin Prompt
                      </button>
                    </div>
                  </div>
                  {/* Output body */}
                  <div ref={outputRef} id="output_container" className="flex-1 overflow-auto p-8 relative rounded-b-[2rem] bg-white dark:bg-[#030509]">
                    <pre className="text-[13px] whitespace-pre-wrap leading-relaxed font-mono selection:bg-orange-500 selection:text-white text-slate-600 dark:text-slate-400">
                      {generatedPrompt}{isStreaming && <span className="inline-block w-[2px] h-[1em] bg-orange-500 align-middle ml-0.5 animate-pulse" />}
                    </pre>
                  </div>
                  {/* Bottom CTA */}
                  <div className="w-full p-4 bg-white dark:bg-transparent rounded-b-[2.3rem]">
                    <button onClick={goToGPT} className="bg-orange-500 text-white border border-transparent hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 text-xs px-5 py-2.5 rounded-2xl font-bold w-full flex items-center gap-2 justify-center cursor-pointer">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      Buat di AI
                    </button>
                  </div>
                </div>
              </section>

            </div>
          </div>
        )}

      </main>

      {/* ══════════ MOBILE LOGOUT FLOATING ══════════ */}
      <div className="fixed bottom-6 right-6 z-50 sm:hidden">
        <button onClick={handleLogout} className="cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-300 focus:outline-none bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-white/5 dark:border-red-900/50 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white" title="Keluar">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>
    </div>
  );
};

export default GeneratorPage;
