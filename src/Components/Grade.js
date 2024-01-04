import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const EmptyImage = () => (
  <div className="empty-image-container">
    <img
      src="https://i.pinimg.com/564x/95/84/1a/95841a9393183d2e3fa5ec5c5098df42.jpg"
      alt="Empty Image"
      className="empty-image"
    />
  </div>
);

const Grade = () => {
  // list of grades
  const [grades, setGrades] = useState([]);

  // input for adding a new grade
  const [newGrade, setNewGrade] = useState('');

  // state to manage whether to show the input form for adding a grade
  const [isAddingGrade, setIsAddingGrade] = useState(false);

  // state to manage edit mode
  const [editIndex, setEditIndex] = useState(null);

  // state to track the edited grade
  const [editedGrade, setEditedGrade] = useState('');

  // Function to handle adding a new grade
  const handleAddGrade = () => {
    // Logic to add a new grade to the list
    setGrades([...grades, newGrade]);

    // Clear the input field after adding a grade
    setNewGrade('');

    // Close the input form
    setIsAddingGrade(false);
  };

  // Function to handle the click event of the "Add" button
  const handleAddButtonClick = () => {
    setIsAddingGrade(true);
  };

  // Function to handle editing a grade
  const handleEditGrade = (index) => {
    // Set the index and the initial value of the edited grade
    setEditIndex(index);
    setEditedGrade(grades[index]);
  };

  // Function to handle saving the edited grade
  const handleSaveEdit = () => {
    // Create a copy of the grades array
    const updatedGrades = [...grades];

    // Update the grade at the specified index
    updatedGrades[editIndex] = editedGrade;

    // Update the state with the modified grades array
    setGrades(updatedGrades);

    // Reset edit mode
    setEditIndex(null);
    setEditedGrade('');
  };

  // Function to handle canceling the edit
  const handleCancelEdit = () => {
    // Reset edit mode
    setEditIndex(null);
    setEditedGrade('');
  };

  // Function to handle deleting a grade
  const handleDeleteGrade = (index) => {
    // Create a copy of the grades array
    const updatedGrades = [...grades];

    // Remove the grade at the specified index
    updatedGrades.splice(index, 1);

    // Update the state with the modified grades array
    setGrades(updatedGrades);
  };

  return (
    <div className="table-content">
      
      {isAddingGrade ? (
        <div className="add-form">
          <label htmlFor="newGrade">Enter Grade:</label>
          <input
            type="text"
            id="newGrade"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
          />
          <div className='submit-button-container'>
            <button className="submit-button" onClick={handleAddGrade}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="p-table">
          <h2>
            Grades
            <button className="add-button" onClick={handleAddButtonClick}>
              Add
            </button>
          </h2>
          <table className="p-table-body">
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Grade</th>
                <th style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td className="grade-cell">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editedGrade}
                        onChange={(e) => setEditedGrade(e.target.value)}
                      />
                    ) : (
                      grade
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="edit-bts">
                      {editIndex === index ? (
                        <>
                          <button className="save-button" onClick={handleSaveEdit}>
                            <FontAwesomeIcon icon={faSave} />
                          </button>
                          <button className="cancel-button" onClick={handleCancelEdit}>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="edit-button" onClick={() => handleEditGrade(index)}>
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="delete-button" onClick={() => handleDeleteGrade(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {grades.length === 0 && !isAddingGrade && <EmptyImage />}
        </div>
      )}
    </div>
  );
};

export default Grade;
