import React from 'react';
import { useAuth } from '../context/authcontext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h1 className="mb-2 text-2xl font-bold">Profile</h1>
            <p>Name: {user?.firstName} {user?.lastName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
        </div>
    );
};

export default Profile;