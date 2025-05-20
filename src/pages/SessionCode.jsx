import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SessionCode.scss';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';

const SessionCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (code.length === 4) {
      navigate('/tastingpage'); // or the next page in your flow
    }
  };

  return (
    <div>
      <Previous onClick={() => navigate(-1)} />
      <div className="session-page">
        <h2 className="code-title">Enter session code to continue</h2>
        <input
          type="text"
          maxLength="4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-input"
        />

        <button className="next-btn" onClick={handleSubmit} disabled={code.length !== 4}>
          →
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default SessionCode;