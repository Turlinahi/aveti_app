import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faFile } from '@fortawesome/free-solid-svg-icons';

const Chunk = () => {
  const grades = Array.from({ length: 8 }, (_, i) => i + 1);
  const books = []; // Placeholder for books data
  const topics = []; // Placeholder for topics data
  const chunks = []; // Placeholder for chunks data

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [isAddingSubtopic, setIsAddingSubtopic] = useState(false);
  const [selectedChunks, setSelectedChunks] = useState([]);
  const [isAddingBookFile, setIsAddingBookFile] = useState(false);

  const handleEmbed = () => {
    console.log('Embedding chunks');
  };

  const handleChunkSelect = (chunkId) => {
    console.log('Selected chunk:', chunkId);
  };

  const handleSelectAll = () => {
    console.log('Selecting all chunks');
  };

  const handleFileSubmit = (files) => {
    console.log('Submitting book file:', files);
    setIsAddingBookFile(false);
  };

  const handleAddChunk = () => {
    setIsAddingSubtopic(true);
  };

  const handleAddSubmit = () => {
    console.log('Submitting new chunk');
    setIsAddingSubtopic(false);
    // Add logic to handle the submission of a new chunk
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSubmit(files);
    }
  };

  return (
    <div className='table-content'>
      {/* Dropdown list for Grade */}
      <div>
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

      {/* Dropdown list for Book */}
      <div>
        <label htmlFor="bookDropdown">Choose Book:</label>
        <select
          id="bookDropdown"
          onChange={(e) => setSelectedBook(e.target.value)}
          value={selectedBook}
        >
          <option value="">Select a Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown list for Topic */}
      <div>
        <label htmlFor="topicDropdown">Choose Topic:</label>
        <select
          id="topicDropdown"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <option value="">Select a Topic</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chunks Table */}
      <div className='chunks-table'>
        <h2>
          Chunks
          <button className='add-button' onClick={handleAddChunk}>
            Add
          </button>
          <button className='add-button' onClick={() => setIsAddingBookFile(true)}>
            Add Book File
          </button>
        </h2>

        <table className='chunks-table'>
          <thead>
            <tr>
              <th>Chunks</th>
              <th>Type</th>
              <th>Embeded Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {chunks.map((chunk) => (
              <tr key={chunk.id}>
                <td>{chunk.name}</td>
                <td>{chunk.type}</td>
                <td>{chunk.isEmbeded ? <FontAwesomeIcon icon={faCheck} /> : 'Not Embeded'}</td>
                <td>
                  <button className='edit-button' onClick={() => handleChunkSelect(chunk.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Chunk Form */}
      {isAddingSubtopic && (
        <div className='add-form'>
          <div>
            <label htmlFor='subtopicName'>Subtopic Name:</label>
            <input type='text' id='subtopicName' />
          </div>

          <div>
            <label htmlFor='chapterName'>Chapter Name:</label>
            <input type='text' id='chapterName' />
            {/* Link part */}
            <a href='#'>Link to Book</a>
          </div>

          <div>
            <label htmlFor='oldText'>Old Text:</label>
            <textarea id='oldText' rows='4'></textarea>
          </div>

          <div>
            <label htmlFor='newText'>New Text:</label>
            <textarea id='newText' rows='4'></textarea>
          </div>

          <button className='submit-button' onClick={handleAddSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Add Book File Form */}
      {isAddingBookFile && (
        <div className='add-form'>
          <div>
            <label htmlFor="gradeDropdownFile">Choose Grade:</label>
            <select id="gradeDropdownFile">
              <option value="">Select a Grade</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="bookDropdownFile">Choose Book:</label>
            <select id="bookDropdownFile">
              <option value="">Select a Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="topicDropdownFile">Choose Topic:</label>
            <select id="topicDropdownFile">
              <option value="">Select a Topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          <div className='file-drop-area'>
            <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faFile} size='2x' />
              <p>Drop files here or click to choose</p>
              <input type="file" id="fileInput" onChange={handleFileInputChange} />
            </label>
          </div>

          <button className='submit-button' onClick={handleFileSubmit}>
            Submit
          </button>
        </div>
      )}

      {/* Embed Chunks */}
      <div>
        {selectedChunks.length > 0 && (
          <>
            <div>
              <label>Selected Chunks:</label>
              <ul>
                {selectedChunks.map((chunkId) => (
                  <li key={chunkId}>{`Chunk ${chunkId}`}</li>
                ))}
              </ul>
            </div>

            <button className='submit-button' onClick={handleEmbed}>
              Embed
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Chunk;
