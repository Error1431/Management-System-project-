import React from 'react';
import { useAuth } from '../context/authcontext';
import { FaUsers, FaBook, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { user } = useAuth();
    const stats = [
        { title: 'Total Students', value: '1,234', icon: FaUsers, color: 'bg-blue-500' },
        { title: 'Total Courses', value: '45', icon: FaBook, color: 'bg-green-500' },
        { title: 'Average GPA', value: '3.45', icon: FaChartLine, color: 'bg-yellow-500' },
        { title: 'Attendance Rate', value: '92%', icon: FaCalendarCheck, color: 'bg-purple-500' }
    ];
    const lineChartData = { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Student Enrollment', data: [65, 78, 90, 105, 120, 134], borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.5)' }] };
    const barChartData = { labels: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'], datasets: [{ label: 'Students per Department', data: [300, 250, 180, 200, 170], backgroundColor: 'rgba(59, 130, 246, 0.5)' }] };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.firstName} {user?.lastName}!</h1>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{user?.role?.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className={`${stat.color} p-4 rounded-full text-white mr-4`}><stat.icon size={24} /></div>
                        <div><p className="text-gray-500 text-sm">{stat.title}</p><p className="text-2xl font-bold text-gray-800">{stat.value}</p></div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-xl font-bold mb-4 text-gray-800">Enrollment Trend</h2><Line data={lineChartData} /></div>
                <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-xl font-bold mb-4 text-gray-800">Department Distribution</h2><Bar data={barChartData} /></div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2><div className="space-y-3">{[1, 2, 3, 4, 5].map((item) => (<div key={item} className="flex items-center justify-between border-b pb-3"><div className="flex items-center"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"><FaUsers className="text-blue-600" /></div><div><p className="font-semibold text-gray-800">New student enrolled</p><p className="text-sm text-gray-500">John Doe enrolled in Computer Science</p></div></div><span className="text-sm text-gray-400">2 hours ago</span></div>))}</div></div>
        </div>
    );
};

export default Dashboard;