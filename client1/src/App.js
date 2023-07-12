import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:3002/upload', formData);

      console.log('File uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='conatiner'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} className='upload'>Upload</button>
    </div>
  );
}

export default App;
