import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans bg-slate-50 selection:bg-orange-500 selection:text-white dark:bg-[#0B0F19] transition-colors duration-300">

            {/* Background Effects */}
            <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,rgba(0,0,0,0)_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
            <div className="absolute top-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05] z-0 pointer-events-none"></div>

            <div className="relative z-10 text-center px-6 animate-[fadeIn_0.8s_ease-out]">
                {/* 404 Glitch Effect Wrapper */}
                <div className="relative inline-block mb-4">
                    <h1 className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-b from-slate-200 to-slate-300 bg-clip-text text-transparent dark:from-[#151925] dark:to-[#0B0F19] select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl font-bold text-orange-500 animate-pulse">
                            Oops!
                        </span>
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Halaman Tidak Ditemukan
                </h2>

                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
                    Sepertinya Anda tersesat di antariksa digital. Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold border-2 border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-all duration-300 dark:border-white/10 dark:text-slate-400 dark:hover:border-orange-500 dark:hover:text-orange-500 cursor-pointer"
                    >
                        Kembali
                    </button>

                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Ke Halaman Utama
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-center w-full z-10">
                <p className="text-xs text-slate-400 dark:text-slate-600 font-medium tracking-wide uppercase">
                    Error Code: 404_PAGE_NOT_FOUND
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
