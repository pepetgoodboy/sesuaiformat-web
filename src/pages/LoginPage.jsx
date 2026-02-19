import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toasts, setToasts] = useState([]);
    const navigate = useNavigate();
    // Theme initialization
    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
        localStorage.setItem('theme', savedTheme);
    }, []);
    const showToast = (message, type = 'default') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const { signIn } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast("Mohon lengkapi semua field", "error");
            return;
        }
        if (!email.includes('@')) {
            showToast("Format email tidak valid", "error");
            return;
        }
        setLoading(true);
        try {
            await signIn(email, password);
            showToast("Login Berhasil! Mengalihkan...", "success");
            setTimeout(() => {
                navigate('/generator');
            }, 1000);
        } catch (error) {
            console.error("Login Error:", error);
            showToast(error.message || "Email atau password salah", "error");
        } finally {
            setLoading(false);
        }
    };
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-orange-500 selection:text-white font-sans text-[var(--text-main)] transition-colors duration-300">
            <Toast toasts={toasts} />
            {/* Background Ambient Light */}
            <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,rgba(11,15,25,0)_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-[1] pointer-events-none"></div>
            {/* Theme Toggle Button */}
            <div className="fixed top-6 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl bg-white/5 border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
                    aria-label="Toggle Dark Mode"
                >
                    {/* Icons would need to be conditional based on theme state if we tracked it in React state fully, but for simple toggle we act on DOM. 
                 Ideally, sync React state with DOM attribute. */}
                    <svg className="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <svg className="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>
            </div>
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 relative z-10">
                <div className="w-full max-w-[480px] animate-[slideUp_0.6s_ease-out_forwards]">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm p-3 mb-4 mx-auto data-[theme=light]:bg-orange-100 data-[theme=light]:border-orange-200">
                            {/* Placeholder Logo Icon */}
                            <img src="/logo.png" alt="Logo SesuaiFormat.id" className='w-full h-full object-contain' />
                            {/* <svg className="w-full h-full text-brand-orange text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg> */}
                        </div>
                        <h1 className="text-3xl font-bold font-sans text-inherit mb-2 data-[theme=light]:text-slate-900">
                            Selamat Datang Kembali
                        </h1>
                        <p className="text-slate-400 text-sm data-[theme=light]:text-slate-600">
                            Masuk untuk mengelola <span className="text-orange-500 font-semibold">Website, Link Bio & Landing Page</span> Anda.
                        </p>
                    </div>
                    {/* Login Card */}
                    <div className="glass-card rounded-[2.5rem] p-8 sm:p-10">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 data-[theme=light]:text-slate-500">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                                        <svg className="h-5 w-5 form-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-input"
                                        placeholder="nama@perusahaan.com"
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="ml-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider data-[theme=light]:text-slate-500">
                                        Password
                                    </label>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors">
                                        <svg className="h-5 w-5 form-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-input pr-12"
                                        placeholder="••••••••••••"
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer data-[theme=light]:hover:text-slate-700"
                                    >
                                        {!showPassword ? (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 bg-[length:200%_auto] text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4 flex items-center justify-center gap-2 group cursor-pointer hover:bg-right disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span>Memproses...</span>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <span>Masuk Sekarang</span>
                                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                    {/* Footer Brand */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600 font-medium">
                            &copy; 2026 <span className="text-orange-500">SesuaiFormat.id.</span> All rights reserved.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default LoginPage;