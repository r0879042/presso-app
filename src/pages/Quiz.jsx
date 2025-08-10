import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import { Button, Row, Col, Container} from 'react-bootstrap';
import '../styles/Quiz.scss';
import answer1 from '../assets/images/answer1.jpg'
import answer2 from '../assets/images/answer2.jpg'
import answer3 from '../assets/images/answer3.jpg'

const Quiz = () => {
  const navigate = useNavigate();
  const [pics, setPics] = useState([answer1, answer2, answer3, answer1]);
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
      <div className="center">
        <Container className="center">
          <h2 className="question">{questions[currentQuestionId] && questions[currentQuestionId].question}</h2>
          <Row className="justify-content-center flex-wrap">
            {questions[currentQuestionId] && questions[currentQuestionId].answers.map((option, index) => (
              <Col xs={12 / questions[currentQuestionId].length} key={index} className="d-flex justify-content-center">
                <div
                    className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                  <img
                    src={pics[index]}
                    alt={option.answer}
                    className="option-image"
                  />
                  <div className="option-text">
                    <p>{option.answer}</p>
                    {option.description && <p>{option.description}</p>}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="progress-tracker my-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`tracker-step ${index === currentQuestionId ? 'active' : ''} ${index < currentQuestionId ? 'completed' : ''}`}
                      onClick={() => {
                if (index < currentQuestionId) {
                    setCurrentQuestionId(index);
                  }
                }}
                style={{ cursor: index < currentQuestionId ? 'pointer' : 'default' }}
              >
                <span className="tracker-number">{index + 1}</span>
                {index < questions.length - 1 && <span className="tracker-line" style={{ width: `calc(60vw / ${questions.length})` }}></span>}
              </div>
            ))}
          </div>
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