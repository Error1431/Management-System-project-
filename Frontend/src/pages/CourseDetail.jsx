import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { id } = useParams();

    return <div className="rounded-xl bg-white p-6 shadow">Course detail: {id}</div>;
};

export default CourseDetail;