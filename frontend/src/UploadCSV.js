import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios.post("http://localhost:4000/uploadCSV", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('File successfully uploaded');
            onUploadSuccess(); // Trigger the callback after successful upload
        })
        .catch(error => alert('Error uploading file'));
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    );
};

export default UploadCSV;
