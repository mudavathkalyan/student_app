import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

const Registrations = () => {
  const {
    offerings,
    courses,
    courseTypes,
    registrations,
    setRegistrations,
  } = useData();

  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [studentName, setStudentName] = useState('');

  const getOfferingLabel = (offeringId) => {
    const offering = offerings.find((o) => o.id === offeringId);
    if (!offering) return '';
    const type = courseTypes.find((t) => t.id === offering.courseTypeId)?.name || 'Type';
    const course = courses.find((c) => c.id === offering.courseId)?.name || 'Course';
    return `${type} - ${course}`;
  };

  const handleRegister = () => {
    if (!studentName.trim() || !selectedOfferingId) return;

    const newEntry = {
      id: uuidv4(),
      name: studentName.trim(),
      offeringId: selectedOfferingId,
    };

    setRegistrations([...registrations, newEntry]);
    setStudentName('');
    setSelectedOfferingId('');
  };

  const grouped = registrations.reduce((acc, reg) => {
    if (!acc[reg.offeringId]) acc[reg.offeringId] = [];
    acc[reg.offeringId].push(reg.name);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Student Registrations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={selectedOfferingId}
          onChange={(e) => setSelectedOfferingId(e.target.value)}
        >
          <option value="">Select Offering</option>
          {offerings.length === 0 ? (
            <option disabled>No offerings available</option>
          ) : (
            offerings.map((offer) => (
              <option key={offer.id} value={offer.id}>
                {getOfferingLabel(offer.id)}
              </option>
            ))
          )}
        </select>

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mb-6"
        onClick={handleRegister}
      >
        Register Student
      </button>

      <div className="space-y-4">
        {Object.keys(grouped).length === 0 ? (
          <p className="text-gray-500">No registrations yet.</p>
        ) : (
          Object.entries(grouped).map(([offeringId, students]) => (
            <div key={offeringId} className="bg-gray-50 p-4 rounded shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{getOfferingLabel(offeringId)}</h3>
              <ul className="list-disc list-inside">
                {students.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Registrations;
