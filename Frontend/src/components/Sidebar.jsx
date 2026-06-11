import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBook, FaChartBar, FaCalendarCheck, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/students', icon: FaUsers, label: 'Students' },
        { path: '/courses', icon: FaBook, label: 'Courses' },
        { path: '/grades', icon: FaChartBar, label: 'Grades' },
        { path: '/attendance', icon: FaCalendarCheck, label: 'Attendance' },
        { path: '/profile', icon: FaUserCircle, label: 'Profile' },
    ];

    return (
        <aside className="bg-gray-800 text-white w-64 fixed left-0 top-16 bottom-0 overflow-y-auto">
            <nav className="p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`
                                }
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;