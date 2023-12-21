import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

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

        {/* Dropdown list of books */}
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

        {/* Dropdown list of topics */}
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
        <div className='subtopics-table'>
          <h2>
            Subtopics
            <button className='add-button' onClick={handleAddButtonClick}>
              Add
            </button>
          </h2>

          <table className='subtopics-table'>
            <thead>
              <tr>
                <th>Subtopic</th>
                <th>Grade</th>
                <th>Book</th>
                <th>Topic</th>
                <th>Actions</th>
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
        </div>
      )}
    </div>
  );
};

export default Subtopic;
