import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

const CourseOfferings = () => {
  const {
    courseTypes,
    courses,
    offerings,
    setOfferings,
  } = useData();

  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [editingId, setEditingId] = useState(null);

  const getLabel = (typeId, courseId) => {
    const type = courseTypes.find((t) => t.id === typeId)?.name;
    const course = courses.find((c) => c.id === courseId)?.name;
    return `${type} - ${course}`;
  };

  const handleSubmit = () => {
    if (!selectedTypeId || !selectedCourseId) return;

    if (editingId) {
      const updated = offerings.map((offer) =>
        offer.id === editingId
          ? { ...offer, courseTypeId: selectedTypeId, courseId: selectedCourseId }
          : offer
      );
      setOfferings(updated);
      setEditingId(null);
    } else {
      const newOffering = {
        id: uuidv4(),
        courseTypeId: selectedTypeId,
        courseId: selectedCourseId,
      };
      setOfferings([...offerings, newOffering]);
    }

    setSelectedTypeId('');
    setSelectedCourseId('');
  };

  const handleEdit = (id) => {
    const item = offerings.find((o) => o.id === id);
    if (item) {
      setSelectedTypeId(item.courseTypeId);
      setSelectedCourseId(item.courseId);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const filtered = offerings.filter((o) => o.id !== id);
    setOfferings(filtered);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Manage Course Offerings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={selectedTypeId}
          onChange={(e) => setSelectedTypeId(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded px-3 py-2"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.length === 0 ? (
            <option disabled>No courses found</option>
          ) : (
            courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))
          )}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="divide-y">
        {offerings.map((offer) => (
          <li key={offer.id} className="flex justify-between py-2 items-center">
            <span>{getLabel(offer.courseTypeId, offer.courseId)}</span>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:underline" onClick={() => handleEdit(offer.id)}>Edit</button>
              <button className="text-red-500 hover:underline" onClick={() => handleDelete(offer.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferings;
