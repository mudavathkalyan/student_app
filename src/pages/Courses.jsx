import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

const Courses = () => {
  const { courses, setCourses } = useData();

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editingId) {
      const updated = courses.map((course) =>
        course.id === editingId ? { ...course, name: input } : course
      );
      setCourses(updated);
      setEditingId(null);
    } else {
      const newCourse = {
        id: uuidv4(),
        name: input.trim(),
      };
      setCourses([...courses, newCourse]);
    }

    setInput('');
  };

  const handleEdit = (id) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setInput(course.name);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Manage Courses</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Enter course name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="divide-y">
        {courses.map((course) => (
          <li key={course.id} className="flex justify-between py-2">
            <span>{course.name}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(course.id)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
