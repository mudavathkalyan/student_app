import React from 'react';
import { useData } from '../context/DataContext';

const Home = () => {
  const {
    courseTypes,
    courses,
    offerings,
    registrations,
  } = useData();

  const getOfferingLabel = (offeringId) => {
    const offering = offerings.find((o) => o.id === offeringId);
    if (!offering) return '';
    const type = courseTypes.find((t) => t.id === offering.courseTypeId)?.name || 'Type';
    const course = courses.find((c) => c.id === offering.courseId)?.name || 'Course';
    return `${type} - ${course}`;
  };

  const grouped = registrations.reduce((acc, reg) => {
    if (!acc[reg.offeringId]) acc[reg.offeringId] = [];
    acc[reg.offeringId].push(reg.name);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-1xl font-bold mb-4">List of all Registered Students.</h1>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">No students have registered yet.</p>
      ) : (
        Object.entries(grouped).map(([offeringId, students]) => (
          <div
            key={offeringId}
            className="bg-white border rounded p-4 shadow mb-4 shadow-gray-900"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {getOfferingLabel(offeringId)}
            </h2>
            <ul className="list-disc list-inside text-gray-800">
              {students.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
