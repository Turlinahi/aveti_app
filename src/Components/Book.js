import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const Book = () => {
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Russian', 'Arabic',
    // ... adăugați mai multe limbi după necesitate
  ];

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBook, setEditedBook] = useState('');

  const filteredBooks = selectedGrade
    ? books.filter((book) => book.grade === selectedGrade)
    : books;

  const handleAddBook = () => {
    setBooks([...books, { title: newBook, grade: selectedGrade, language: selectedLanguage }]);
    setNewBook('');
    setSelectedGrade('');
    setSelectedLanguage('');
    setIsAddingBook(false);
  };

  const handleAddButtonClick = () => {
    setIsAddingBook(true);
  };

  const handleEditBook = (index) => {
    setEditIndex(index);
    setEditedBook(books[index].title);
    setSelectedGrade(books[index].grade);
    setSelectedLanguage(books[index].language);
  };

  const handleSaveEdit = () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = { title: editedBook, grade: selectedGrade, language: selectedLanguage };
    setBooks(updatedBooks);
    setEditIndex(null);
    setEditedBook('');
    setSelectedGrade('');
    setSelectedLanguage('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedBook('');
    setSelectedGrade('');
    setSelectedLanguage('');
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  return (
    <div className='table-content'>
      {/* Dropdown list of grades */}
      <div>
        <label htmlFor="gradeDropdown">Select Grade:</label>
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

      {isAddingBook ? (
        <div className='add-form'>
          <label htmlFor='newBook'>Enter new Book:</label>
          <input
            type='text'
            id='newBook'
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
          />

          {/* Choose Language dropdown */}
          <label htmlFor="languageDropdown">Choose Language:</label>
          <select
            id="languageDropdown"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            value={selectedLanguage}
          >
            <option value="">Choose a Language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          {/* Submit button */}
          <button className='submit-button' onClick={handleAddBook}>
            Submit
          </button>
        </div>
      ) : (
        <div className='books-table'>
          <h2>
            Books
            <button className='add-button' onClick={handleAddButtonClick}>
              Add
            </button>
          </h2>

          <table className='books-table'>
            <thead>
              <tr>
                <th>Book</th>
                <th>Grade</th>
                <th>Language</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index}>
                  <td>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={editedBook}
                        onChange={(e) => setEditedBook(e.target.value)}
                      />
                    ) : (
                      book.title
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
                      book.grade
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <select
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        value={selectedLanguage}
                      >
                        <option value="">Choose a Language</option>
                        {languages.map((language, index) => (
                          <option key={index} value={language}>
                            {language}
                          </option>
                        ))}
                      </select>
                    ) : (
                      book.language
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
                        <button className='edit-button' onClick={() => handleEditBook(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>

                        <button className='delete-button' onClick={() => handleDeleteBook(index)}>
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

export default Book;
