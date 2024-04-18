import React, { useState } from 'react';
import './Modal.css';  // Make sure to create a CSS file for basic styling

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [queryText, setQueryText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Query</h2>
        <input
          type="text"
          placeholder="Enter your query"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
        <button onClick={() => onSubmit(queryText)}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

