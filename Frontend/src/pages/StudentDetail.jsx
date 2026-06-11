import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();

    return <div className="rounded-xl bg-white p-6 shadow">Student detail: {id}</div>;
};

export default StudentDetail;