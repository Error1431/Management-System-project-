import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/authcontext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Profile from './pages/Profile';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <div className="min-h-screen bg-gray-100 font-sans antialiased">
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <AppContent />
                    </div>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
}

function AppContent() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <>
            {user && <Navbar />}
            <div className="flex">
                {user && <Sidebar />}
                <main className={`flex-1 transition-all duration-300 ${user ? 'ml-64 mt-16' : ''} p-6`}>
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
                        <Route path="/students/:id" element={<PrivateRoute><StudentDetail /></PrivateRoute>} />
                        <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
                        <Route path="/courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
                        <Route path="/grades" element={<PrivateRoute><Grades /></PrivateRoute>} />
                        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}

export default App;