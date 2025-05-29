import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import { Button, Form, Card} from 'react-bootstrap';
import '../styles/Quiz.scss';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(1);
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
        setAnswer(data, currentQuestionId, selectedOption);
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
          setAnswer(currentSession, currentQuestionId, selectedOption);
        }
        setCurrentQuestionId(currentQuestionId + 1);
    }
    else{
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
        <Card className="question">
          <Card.Body>
            <Card.Text>
              {questions[currentQuestionId] && questions[currentQuestionId].question}
            </Card.Text>
          </Card.Body>
        </Card>

        <Form className="form">
          {questions[currentQuestionId] && questions[currentQuestionId].answers.map((option, index) => (
            <Form.Check 
              type="radio"
              key={index}
              name="answer"
              id={`option-${index}`}
              label={option.answer}
              value={option.answer}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              className="answer"
            />
          ))}
        </Form>

        <Button 
          variant="success" 
          className="next action-button" 
          disabled={!selectedOption} 
          onClick={nextQuestion}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Quiz;