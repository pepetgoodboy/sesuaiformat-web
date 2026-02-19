
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;
    }

    if (session) {
        return <Navigate to="/generator" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
