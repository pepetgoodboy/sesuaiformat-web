
import React, { useEffect } from 'react';

const Toast = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center gap-3 px-6 py-4 rounded-lg bg-white-900/95 dark:bg-gray-900/95 backdrop-blur border-l-4 shadow-lg transition-all duration-300 animate-slide-in ${toast.type === 'success' ? 'border-green-500' :
                        toast.type === 'error' ? 'border-red-500' : 'border-orange-500'
                        }`}
                >
                    {toast.type === 'success' && (
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    )}
                    {toast.type === 'error' && (
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    {toast.type === 'default' && (
                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <span className="text-sm font-medium text-gray-800 dark:text-white">{toast.message}</span>
                </div>
            ))}
        </div>
    );
};

export default Toast;
