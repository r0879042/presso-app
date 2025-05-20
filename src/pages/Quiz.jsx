import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import { Button, Form, Card} from 'react-bootstrap';
import '../styles/Quiz.scss';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);
  const [currentSession, setCurrentSession] = useState('');

  useEffect(() => {
    setQuestion(1);
  }, []);

  const getSessionAndSetAnswer = () => {
    fetch('http://127.0.0.1:8000/api/session')
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

  const setQuestion = (id) => {
    fetch('http://127.0.0.1:8000/api/question/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if(data.question != undefined){
          setCurrentQuestionId(id);
          setCurrentQuestion(data.question);
          setCurrentOptions(data.answers);
        }
        else{
          navigate('/recommendations/' + currentSession);
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

    fetch('http://127.0.0.1:8000/api/sessionanswer', requestOptions)
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
    if(currentQuestionId === 1){
      navigate(-1);
    }
    else{
      setQuestion(currentQuestionId - 1);
    }
  };

  const nextQuestion = () => {
    if(currentSession == ''){
      getSessionAndSetAnswer();
    }
    else{
      setAnswer(currentSession, currentQuestionId, selectedOption);
    }
    setQuestion(currentQuestionId + 1);
  };

  return  (
    <div className="quiz">
      <Previous onClick={() => previousQuestion()} />
      <div className="center">
        <Card className="question">
          <Card.Body>
            <Card.Text>
              {currentQuestion}
            </Card.Text>
          </Card.Body>
        </Card>

        <Form className="form">
          {currentOptions.map((option, index) => (
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