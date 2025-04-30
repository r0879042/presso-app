import React from "react";
import { useNavigate } from 'react-router-dom';
import "./../styles/Quiz.scss";
import Navbar from '../components/Navbar';

const CoffeeQuizStart = () => {
  const navigate = useNavigate();

  return (
    <div className="coffee-quiz container text-center py-5">
      <div className="text-section mb-4">
        <a href="#" className="text-muted small d-block text-start mb-2" onClick={() => navigate(-1)}>← Previous</a>
        <h2 className="quiz-title">Coffee Profiler Quiz</h2>
        <p className="quiz-description">
          Designed to uncover your ideal Nespresso experience, <br />
          our 5 question quiz will craft the perfect cup of coffee for you
        </p>
        <button className="btn btn-success mt-3" onClick={() => navigate('/quiz')}>Start the Quiz</button>
      </div>
      <div className="image-section mt-4">
        <img src="" alt="Nespresso Coffee" className="img-fluid" />
      </div>
      <Navbar />  
    </div>
  );
};

export default CoffeeQuizStart;
