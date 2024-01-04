import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const EmptyImage = () => (
  <div className="empty-image-container">
    <img
      src="https://i.pinimg.com/564x/b8/e6/7e/b8e67ed688088ba281a646ac79b0a7c9.jpg"
      alt="Empty Image"
      className="empty-image"
    />
  </div>
);

const Chunk = () => {
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);

  const [tableData, setTableData] = useState([]);
  const [newChunk, setNewChunk] = useState({ Chunks: '', Type: '', EmbeddedStatus: '', Reviewed: '' });
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isAddingChunk, setIsAddingChunk] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedChunks, setSelectedChunks] = useState([]); // New state for selected chunks

  const filteredChunks = tableData.filter(chunk => (
    (!selectedGrade || chunk.grade === selectedGrade) &&
    (!selectedBook || chunk.book === selectedBook) &&
    (!selectedTopic || chunk.topic === selectedTopic)
  ));

  useEffect(() => {
    // Include any necessary logic inside useEffect if needed
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleAddChunk = () => {
    setTableData([...tableData, { ...newChunk, grade: selectedGrade, book: selectedBook, topic: selectedTopic }]);
    setNewChunk({ Chunks: '', Type: '', EmbeddedStatus: '', Reviewed: '' });
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
    setIsAddingChunk(false);
  };

  const handleAddButtonClick = () => {
    setIsAddingChunk(true);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // You can perform additional logic with the selected file, such as storing it in state
    console.log('Selected file:', file);
  };

  const handleEditChunk = (index) => {
    setEditIndex(index);
    setNewChunk({ ...filteredChunks[index] });
  };

  const handleSaveEdit = () => {
    const updatedChunks = [...tableData];
    updatedChunks[editIndex] = { ...newChunk, grade: selectedGrade, book: selectedBook, topic: selectedTopic };
    setTableData(updatedChunks);
    setEditIndex(null);
    setNewChunk({ Chunks: '', Type: '', EmbeddedStatus: '', Reviewed: '' });
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setNewChunk({ Chunks: '', Type: '', EmbeddedStatus: '', Reviewed: '' });
    setSelectedGrade('');
    setSelectedBook('');
    setSelectedTopic('');
  };

  const handleDeleteChunk = (index) => {
    const updatedChunks = [...tableData];
    updatedChunks.splice(index, 1);
    setTableData(updatedChunks);
  };

  // Function to handle checkbox selection
  const handleCheckboxChange = (index) => {
    const updatedSelectedChunks = [...selectedChunks];
    if (updatedSelectedChunks.includes(index)) {
      // If the index is already in the array, remove it
      updatedSelectedChunks.splice(updatedSelectedChunks.indexOf(index), 1);
    } else {
      // Otherwise, add it to the array
      updatedSelectedChunks.push(index);
    }
    setSelectedChunks(updatedSelectedChunks);
  };

  // Function to handle deleting selected chunks
  const handleDeleteSelectedChunks = () => {
    const updatedChunks = tableData.filter((_, index) => !selectedChunks.includes(index));
    setTableData(updatedChunks);
    setSelectedChunks([]);
  };

  // New state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredChunks.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  // Function to handle counting selected chunks
  const countSelectedChunks = () => {
    return selectedChunks.length;
  };


  return (
    <div className='table-content'>
      <div>
        {/* Dropdown list of grades */}
        <div className="dropdown-container">
          <label className='dropdown-title' htmlFor="gradeDropdown">Choose Grade:</label>
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
          <label className='dropdown-title' htmlFor="bookDropdown">Choose Book:</label>
          <select
            id="bookDropdown"
            onChange={(e) => setSelectedBook(e.target.value)}
            value={selectedBook}
          >
            <option value="">Select a Book</option>
            {filteredChunks.map(chunk => chunk.book).filter((value, index, self) => self.indexOf(value) === index).map((book, index) => (
              <option key={index} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown list of topics */}
        <div className="dropdown-container">
          <label className='dropdown-title' htmlFor="topicDropdown">Choose Topic:</label>
          <select
            id="topicDropdown"
            onChange={(e) => setSelectedTopic(e.target.value)}
            value={selectedTopic}
          >
            <option value="">Select a Topic</option>
            {filteredChunks.map(chunk => chunk.topic).filter((value, index, self) => self.indexOf(value) === index).map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <button className='add-button' onClick={handleAddButtonClick}>Add</button>
        </div>
      </div>

      {isAddingChunk ? (
        <div className='add-form'>
          {/* Input fields for adding a new chunk */}
          <label htmlFor='newChunks'>Enter new Chunks:</label>
          <input
            type='text'
            id='newChunks'
            value={newChunk.Chunks}
            onChange={(e) => setNewChunk({ ...newChunk, Chunks: e.target.value })}
          />

          {/* File input for adding a file */}
          <label htmlFor='fileInput'>Add a file:</label>
          <input
            type='file'
            id='fileInput'
            accept='application/pdf' // Specify the accepted file type if necessary
            onChange={(e) => handleFileInputChange(e)}
          />

          {/* Submit button */}
          <button className="submit-button" onClick={handleAddChunk}>
            Submit
          </button>
        </div>
      ) : (
        <div className='p-table'>
          <button className='delete-selected-button' onClick={handleDeleteSelectedChunks}>
            Delete Selected
          </button>
                      {/* button to dynamically display the count */}
                      <button className='selected-count-button'>
              {countSelectedChunks() > 0
                ? `Selected: ${countSelectedChunks()} / Total: ${tableData.length}`
                : `Total: ${tableData.length}`}
            </button>
          {/* Table for displaying chunks */}
          <table className='p-table-table'>
            <thead>
              <tr>
                <th style={{ width: '30px' }}>Select</th>
                <th style={{ width: '500px' }}>Chunks</th>
                <th style={{ width: '10px' }}>Type</th>
                <th style={{ width: '10px' }}>Embedded Status</th>
                <th style={{ width: '10px' }}>Reviewed</th>
                <th style={{ width: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
                
            {filteredChunks.slice(startIndex, endIndex).map((chunk, index) => (
                <tr key={index}>

              {/* {filteredChunks.map((chunk, index) => (
                <tr key={index}> */}
                  <td>
                    <input
                      type='checkbox'
                      checked={selectedChunks.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className='grade-cell'>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={newChunk.Chunks}
                        onChange={(e) => setNewChunk({ ...newChunk, Chunks: e.target.value })}
                      />
                    ) : (
                      chunk.Chunks
                    )}
                  </td>
                  <td className='grade-cell'>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={newChunk.Type}
                        onChange={(e) => setNewChunk({ ...newChunk, Type: e.target.value })}
                      />
                      
                    ) : (
                      chunk.Type
                    )}
                  </td>
                  <td className='grade-cell'>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={newChunk.EmbeddedStatus}
                        onChange={(e) => setNewChunk({ ...newChunk, EmbeddedStatus: e.target.value })}
                      />
                    ) : (
                      chunk.EmbeddedStatus
                    )}
                  </td>
                  <td className='grade-cell'>
                    {editIndex === index ? (
                      <input
                        type='text'
                        value={newChunk.Reviewed}
                        onChange={(e) => setNewChunk({ ...newChunk, Reviewed: e.target.value })}
                      />
                    ) : (
                      chunk.Reviewed
                    )}
                  </td>
                  <td className='action-cell'>
                    <div className='edit-bts'>
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
                        <button className='edit-button' onClick={() => handleEditChunk(index)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                          <button className='delete-button' onClick={() => handleDeleteChunk(index)}>
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
           {/* Pagination */}
           {totalPages > 1 && (
            <div className="pagination-container">
            <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            {'<'}
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
            <button
                key={index}
                className="pagination-button"
                onClick={() => handlePageChange(index + 1)}
                style={{ backgroundColor: currentPage === index + 1 ? '#4CAF50' : '' }}
            >
                {index + 1}
            </button>
            ))}

            <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            {'>'}
            </button>

            </div>
          )}
          {/* Conditionally render the empty image */}
          {tableData.length === 0 && <EmptyImage />}
        </div>
      )}
    </div>
  );
};

export default Chunk;
