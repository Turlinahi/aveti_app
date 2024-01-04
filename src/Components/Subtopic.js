import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';


const EmptyImage = () => (
  <div className="empty-image-container">
    <img
      src="https://i.pinimg.com/564x/4a/72/d7/4a72d7f128e6a5c961dd445cb0fb36da.jpg"
      alt="Empty Image"
      className="empty-image"
    />
  </div>
);

const Subtopic = () => {
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);

  const [subtopics, setSubtopics] = useState([]);
  const [newSubtopic, setNewSubtopic] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isAddingSubtopic, setIsAddingSubtopic] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedSubtopic, setEditedSubtopic] = useState('');

  const filteredSubtopics = subtopics.filter(subtopic => (
    (!selectedGrade || subtopic.grade === selectedGrade) &&
    (!selectedBook || subtopic.book === selectedBook) &&
    (!selectedTopic || subtopic.topic === selectedTopic)
  ));

  const handleAddSubtopic = () => {
    setSubtopics([...subtopics, { name: newSubtopic, grade: selectedGrade, book: selectedBook, topic: selectedTopic }]);
    setNewSubtopic('');
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
    setIsAddingSubtopic(false);
  };

  const handleAddButtonClick = () => {
    setIsAddingSubtopic(true);
  };

  const handleEditSubtopic = (index) => {
    setEditIndex(index);
    setEditedSubtopic(subtopics[index].name);
    setSelectedGrade(subtopics[index].grade);
    setSelectedBook(subtopics[index].book);
    setSelectedTopic(subtopics[index].topic);
  };

  const handleSaveEdit = () => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics[editIndex] = { name: editedSubtopic, grade: selectedGrade, book: selectedBook, topic: selectedTopic };
    setSubtopics(updatedSubtopics);
    setEditIndex(null);
    setEditedSubtopic('');
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedSubtopic('');
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
  };

  const handleDeleteSubtopic = (index) => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics.splice(index, 1);
    setSubtopics(updatedSubtopics);
  };

  return (
    <div className='table-content'>
      <div>
        {/* Dropdown list of grades */}
        <div className="dropdown-container">
        <label htmlFor="gradeDropdown">Choose Grade:</label>
        <select
          id="gradeDropdown"
          onChange={(e) => setSelectedGrade(e.target.value)}
          value={selectedGrade}
        >
          <option value="">Select a Grade</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        </div>

        {/* Dropdown list of books */}
        <div className="dropdown-container">
        <label htmlFor="bookDropdown">Choose Book:</label>
        <select
          id="bookDropdown"
          onChange={(e) => setSelectedBook(e.target.value)}
          value={selectedBook}
        >
          <option value="">Select a Book</option>
          {filteredSubtopics.map(subtopic => subtopic.book).filter((value, index, self) => self.indexOf(value) === index).map((book, index) => (
            <option key={index} value={book}>
              {book}
            </option>
          ))}
        </select>
        </div>

        {/* Dropdown list of topics */}
        <div className="dropdown-container">
        <label htmlFor="topicDropdown">Choose Topic:</label>
        <select
          id="topicDropdown"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <option value="">Select a Topic</option>
          {filteredSubtopics.map(subtopic => subtopic.topic).filter((value, index, self) => self.indexOf(value) === index).map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>
                  
        <button className='add-button' onClick={handleAddButtonClick}>
              Add
            </button>
        </div>
      </div>

      {isAddingSubtopic ? (
        <div className='add-form'>
          <label htmlFor='newSubtopic'>Enter new Subtopic:</label>
          <input
            type='text'
            id='newSubtopic'
            value={newSubtopic}
            onChange={(e) => setNewSubtopic(e.target.value)}
          />

          {/* Submit button */}
          <button className='submit-button' onClick={handleAddSubtopic}>
            Submit
          </button>
        </div>
      ) : (
        <div className='p-table'>


          <table className='p-table-body'>
            <thead>
              <tr>
                <th style={{ width: '200px' }}>Subtopic</th>
                <th style={{ width: '10px' }}>Grade</th>
                <th style={{ width: '100px' }}>Book</th>
                <th style={{ width: '100px' }}>Topic</th>
                <th style={{ width: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubtopics.map((subtopic, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={editedSubtopic}
                        onChange={(e) => setEditedSubtopic(e.target.value)}
                      />
                    ) : (
                      subtopic.name
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        value={selectedGrade}
                      >
                        {grades.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subtopic.grade
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        onChange={(e) => setSelectedBook(e.target.value)}
                        value={selectedBook}
                      >
                        {filteredSubtopics.map(subtopic => subtopic.book).filter((value, index, self) => self.indexOf(value) === index).map((book, index) => (
                          <option key={index} value={book}>
                            {book}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subtopic.book
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        value={selectedTopic}
                      >
                        {filteredSubtopics.map(subtopic => subtopic.topic).filter((value, index, self) => self.indexOf(value) === index).map((topic, index) => (
                          <option key={index} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    ) : (
                      subtopic.topic
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button className='save-button' onClick={handleSaveEdit}>
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button className='cancel-button' onClick={handleCancelEdit}>
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className='edit-button' onClick={() => handleEditSubtopic(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button className='delete-button' onClick={() => handleDeleteSubtopic(index)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Conditionally render the empty image */}
          {subtopics.length === 0 && !isAddingSubtopic && <EmptyImage />}
        </div>
      )}
    </div>
  );
};

export default Subtopic;
