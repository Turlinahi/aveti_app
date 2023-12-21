// components/AddGradeForm.js
import React, { useState } from 'react';

const AddGradeForm = ({ onAddGrade }) => {
  const [newGrade, setNewGrade] = useState('');

  const handleInputChange = (e) => {
    setNewGrade(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new grade to the parent component
    onAddGrade(newGrade);
    // Clear the input field
    setNewGrade('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Grade:
        <input type="text" value={newGrade} onChange={handleInputChange} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddGradeForm;
