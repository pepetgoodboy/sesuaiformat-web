
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RootRoute = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;
    }

    if (session) {
        return <Navigate to="/generator" replace />;
    }

    return <Navigate to="/login" replace />;
};

export default RootRoute;
