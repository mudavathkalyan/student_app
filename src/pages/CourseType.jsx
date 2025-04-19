import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

const predefinedTypes = ['Individual', 'Group', 'Special'];

const CourseTypes = () => {
  const { courseTypes, setCourseTypes } = useData();

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editingId) {
      const updated = courseTypes.map((type) =>
        type.id === editingId ? { ...type, name: input } : type
      );
      setCourseTypes(updated);
      setEditingId(null);
    } else {
      const newType = {
        id: uuidv4(),
        name: input.trim(),
      };
      setCourseTypes([...courseTypes, newType]);
    }

    setInput('');
  };

  const handleEdit = (id) => {
    const type = courseTypes.find((type) => type.id === id);
    if (type) {
      setInput(type.name);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    const filtered = courseTypes.filter((type) => type.id !== id);
    setCourseTypes(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Manage Course Types</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          list="course-type-options"
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder="Select or enter course type"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <datalist id="course-type-options">
          {predefinedTypes.map((type) => (
            <option key={type} value={type} />
          ))}
        </datalist>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="divide-y">
        {courseTypes.map((type) => (
          <li key={type.id} className="flex justify-between py-2">
            <span>{type.name}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(type.id)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(type.id)}
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

export default CourseTypes;
