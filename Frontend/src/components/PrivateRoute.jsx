import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="p-6 text-gray-600">Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;