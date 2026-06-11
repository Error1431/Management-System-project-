import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', firstName: '', lastName: '', email: '', password: '', role: 'student' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            toast.success('Registration successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur">
                <h2 className="mb-2 text-center text-3xl font-bold text-slate-900">Student Management System</h2>
                <p className="mb-6 text-center text-sm text-slate-500">Create your account</p>
                <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="rounded-lg border border-slate-300 px-4 py-3 sm:col-span-2" required />
                    <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="rounded-lg border border-slate-300 px-4 py-3" required />
                    <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="rounded-lg border border-slate-300 px-4 py-3" required />
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="rounded-lg border border-slate-300 px-4 py-3 sm:col-span-2" required />
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="rounded-lg border border-slate-300 px-4 py-3 sm:col-span-2" required />
                    <select name="role" value={formData.role} onChange={handleChange} className="rounded-lg border border-slate-300 px-4 py-3 sm:col-span-2">
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" disabled={loading} className="sm:col-span-2 rounded-lg bg-cyan-700 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800 disabled:opacity-50">
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-slate-600">
                    Already have an account? <Link to="/login" className="font-semibold text-cyan-700 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;