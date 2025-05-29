import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import { Button, Row, Col, Container} from 'react-bootstrap';
import '../styles/Quiz.scss';
import gif from '../assets/images/coffee.gif'

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSession, setCurrentSession] = useState('');
  // Get the correct backend url
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    getQuestions();
  }, []);

  const getSessionAndSetAnswer = () => {
    fetch(`${backendURL}/api/session`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCurrentSession(data);
        setAnswer(data, questions[currentQuestionId].id, selectedOption);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
          setQuestions(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const setAnswer = (sessionCode, questionId, answerId) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, questionId, answerId })
    };

    fetch(`${backendURL}/api/sessionanswer`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Answer saved: ' + JSON.stringify(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const previousQuestion = () => {
    if(currentQuestionId === 0){
      navigate(-1);
    }
    else{
      setCurrentQuestionId(currentQuestionId - 1);
    }
  };

  const nextQuestion = () => {
    if(currentQuestionId < questions.length - 1){
      if(currentSession == ''){
        getSessionAndSetAnswer();
      }
      else{
        setAnswer(currentSession, questions[currentQuestionId].id, selectedOption);
      }
      setCurrentQuestionId(currentQuestionId + 1);
    }
    else{
      setAnswer(currentSession, questions[currentQuestionId].id, selectedOption);
      navigate('/recommendations/' + currentSession);
    }
  };

  return  (
    <div className="quiz">
      <Previous onClick={() => previousQuestion()} />
      <div className="question-counter p-3">
        {currentQuestionId + 1} / {questions.length}
      </div>
      <div className="center">
        <Container className="center">
          <h2 className="question">{questions[currentQuestionId] && questions[currentQuestionId].question}</h2>
          <div className="gif-container mb-3 text-center">
            <img src={gif} alt="coffee gif" className="img-fluid gif" />
          </div>
          <Row>
            {questions[currentQuestionId] && questions[currentQuestionId].answers.map((option, index) => (
              <Col xs={12} key={index}>
                <Button
                className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
                onClick={() => setSelectedOption(option.id)}
                >
                  {option.answer}
                </Button>
              </Col>
            ))}
          </Row>
         <Button 
            variant="success" 
            className="action-button" 
            disabled={!selectedOption} 
            onClick={nextQuestion}
          >
            Next
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Quiz;