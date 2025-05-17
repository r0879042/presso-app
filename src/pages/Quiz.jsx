import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Previous from '../components/Previous';
import { Button, Container, Form } from 'react-bootstrap';


const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setQuestion(1);
  }, []);
 
  const question2 = "Do you prefer a specific cup size?";
  const options2 = [
    'Small',
    'Medium, perfect',
    'Large and filling'
  ];

  const setQuestion = (id) => {
    fetch('http://127.0.0.1:8000/api/question/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCurrentQuestionId(id);
        setCurrentQuestion(data[0].question);
        setCurrentOptions(data[0].answers);
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
     setQuestion(currentQuestionId + 1);
  };

  return  (
<div className="quiz">
  <Previous onClick={() => previousQuestion()} />
  <div className="center px-3">
    <div className="bg-primary text-white p-4 shadow text-center fw-medium mb-4 question">
      {currentQuestion}
    </div>

    <div className="mb-4">
      {currentOptions.map((option, index) => (
        <Form.Check 
          type="radio"
          key={index}
          name="answer"
          id={`option-${index}`}
          label={option.answer}
          value={option.answer}
          checked={selectedOption === option.answer}
          onChange={() => setSelectedOption(option.answer)}
          className="mb-2 answer"
        />
      ))}
    </div>

    <Button 
      variant="success" 
      className="w-50 fw-semibold shadow-sm next" 
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