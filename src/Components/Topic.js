import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';


const EmptyImage = () => (
  <div className="empty-image-container">
    <img
      src="https://i.pinimg.com/564x/b8/e6/7e/b8e67ed688088ba281a646ac79b0a7c9.jpg"
      alt="Empty Image"
      className="empty-image"
    />
  </div>
);


const Topic = () => {
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);

  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTopic, setEditedTopic] = useState('');

  const filteredTopics = topics.filter(topic => (
    (!selectedGrade || topic.grade === selectedGrade) &&
    (!selectedBook || topic.book === selectedBook)
  ));

  const handleAddTopic = () => {
    setTopics([...topics, { name: newTopic, grade: selectedGrade, book: selectedBook }]);
    setNewTopic('');
    setSelectedGrade('');
    setSelectedBook('');
    setIsAddingTopic(false);
  };

  const handleAddButtonClick = () => {
    setIsAddingTopic(true);
  };

  const handleEditTopic = (index) => {
    setEditIndex(index);
    setEditedTopic(topics[index].name);
    setSelectedGrade(topics[index].grade);
    setSelectedBook(topics[index].book);
  };

  const handleSaveEdit = () => {
    const updatedTopics = [...topics];
    updatedTopics[editIndex] = { name: editedTopic, grade: selectedGrade, book: selectedBook };
    setTopics(updatedTopics);
    setEditIndex(null);
    setEditedTopic('');
    setSelectedGrade('');
    setSelectedBook('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedTopic('');
    setSelectedGrade('');
    setSelectedBook('');
  };

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
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
            {filteredTopics.map(topic => topic.book).filter((value, index, self) => self.indexOf(value) === index).map((book, index) => (
              <option key={index} value={book}>
                {book}
              </option>
            ))}
          </select>
          <button className='add-button' onClick={handleAddButtonClick}>Add</button>
        </div>
      </div>

      {isAddingTopic ? (
        <div className='add-form'>
          <label htmlFor='newTopic'>Enter new Topic:</label>
          <input
            type='text'
            id='newTopic'
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />

          {/* Submit button */}
          <button className='submit-button' onClick={handleAddTopic}>
            Submit
          </button>
        </div>
      ) : (
        <div className='p-table'>
          <table className='p-table-body'>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Grade</th>
                <th>Book</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTopics.map((topic, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={editedTopic}
                        onChange={(e) => setEditedTopic(e.target.value)}
                      />
                    ) : (
                      topic.name
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
                      topic.grade
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        onChange={(e) => setSelectedBook(e.target.value)}
                        value={selectedBook}
                      >
                        {filteredTopics.map(topic => topic.book).filter((value, index, self) => self.indexOf(value) === index).map((book, index) => (
                          <option key={index} value={book}>
                            {book}
                          </option>
                        ))}
                      </select>
                    ) : (
                      topic.book
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
                        <button className='edit-button' onClick={() => handleEditTopic(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button className='delete-button' onClick={() => handleDeleteTopic(index)}>
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
                    {topics.length === 0 && !isAddingTopic && <EmptyImage />}
        </div>
      )}
    </div>
  );
};

export default Topic;
