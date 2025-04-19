import React, { useState } from 'react';

const ReusableListManager = ({ title, placeholder }) => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = input;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems([...items, input]);
    }

    setInput('');
  };

  const handleEdit = (index) => {
    setInput(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="divide-y">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between py-2">
            <span>{item}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(index)}
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

export default ReusableListManager;
