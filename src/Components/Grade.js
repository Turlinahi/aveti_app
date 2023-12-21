import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const Grade = () => {
  // list of grades
  const [grades, setGrades] = useState([]);

  // input for adding a new grade
  const [newGrade, setNewGrade] = useState('');

  // state to manage whether to show the input form for adding a grade
  const [isAddingGrade, setIsAddingGrade] = useState(false);

  // Function to handle adding a new grade
  const handleAddGrade = () => { // Logic to add a new grade to the list
    
    setGrades([...grades, newGrade]); // Clear the input field after adding a grade

    setNewGrade(''); // Close the input form
    
    setIsAddingGrade(false);
  };

  // Function to handle the click event of the "Add" button
  const handleAddButtonClick = () => {
    
    setIsAddingGrade(true);
  };

// Function to handle editing a grade
const handleEditGrade = (index) => {
  // Logic to handle edit action
  console.log(`Edit grade at index ${index}`);
};

// Function to handle deleting a grade
const handleDeleteGrade = (index) => {
  // Logic to handle delete action
  console.log(`Delete grade at index ${index}`);
};

  return (
    <div className="grade-content">
  
      {isAddingGrade ? (
        <div className="add-form">
          <label htmlFor="newGrade">Enter Grade:</label>
          <input
            type="text"
            id="newGrade"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
          />
          <button className="submit-button" onClick={handleAddGrade}>
            Submit
          </button>
        </div>
      ) : (
          <div className="grades-table">
          <h2>
            Grades
            <button className="add-button" onClick={handleAddButtonClick}>
              Add
            </button>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditGrade(index)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteGrade(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


export default Grade;
