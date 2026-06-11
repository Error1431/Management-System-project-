import React from 'react';
import { useAuth } from '../context/authcontext';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-16">
            <div className="px-4 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600 ml-64">SMS Dashboard</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-600 hover:text-gray-800">
                        <FaBell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <FaUserCircle size={32} className="text-gray-600" />
                        <div className="hidden md:block">
                            <p className="text-sm font-semibold text-gray-800">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;