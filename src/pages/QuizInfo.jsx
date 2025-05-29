import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import '../styles/QuizInfo.scss';
import quizInfoImg from '../assets/images/quiz-info.png';

const CoffeeQuiz = () => {
  const navigate = useNavigate();
  const [numberOfquestions, setNumberOfquestions] = useState(5);
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
      getQuestions();
    }, []);
  
  const getQuestions = () => {
      fetch(`${backendURL}/api/question`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if(data != undefined){
            setNumberOfquestions(data.length);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

  return (
    <div className="coffee-quiz">
      <Previous onClick={() => navigate(-1)} />
      <Container className="center">
        <h1 className="quiz-title">Coffee Profiler Quiz</h1>
        <p className="quiz-description text-center">
          Designed to uncover your <br />
          ideal Nespresso experience, <br />
          our {numberOfquestions} question quiz will craft the perfect cup <br />
          of coffee for you
        </p>
        <Button className="action-button" variant="success" onClick={() => navigate('/quiz')}>
          Start the Quiz
        </Button>
        <div className="quiz-image">
          <img src={quizInfoImg} alt="Coffee Machine" />
        </div>
      </Container>
      <Navbar />
    </div>
  );
};

export default CoffeeQuiz;