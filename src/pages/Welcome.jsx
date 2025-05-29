import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.scss';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
        <video autoPlay muted loop className="background-video">
            <source src="/capsules/coffee-bg.MP4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <div className="overlay-content">
            <h1>Welcome to Presso</h1>
            <button onClick={() => navigate('/home')}>Click to Start</button>
        </div>
    </div>
  );
};

export default Welcome;