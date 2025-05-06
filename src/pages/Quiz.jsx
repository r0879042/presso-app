import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();

  const question1 = "What’s your go-to drink to start your day ?";
  const options1 = [
    'strong and bold',
    'smooth and comforting.',
    'A sweet treat with a touch of coffee.',
    'I’m open to exploring!.'
  ];
  const [currentQuestion, setCurrentQuestion] = useState(question1);
  const [currentOptions, setCurrentOptions] = useState(options1);
  const [selectedOption, setSelectedOption] = useState('');

  const question2 = "Do you prefer a specific cup size?";
  const options2 = [
    'Small',
    'Medium, perfect',
    'Large and filling'
  ];

  const previousQuestion = () => {
    if(currentQuestion == question1){
      navigate(-1);
    }
    else{
      setCurrentQuestion(question1);
      setCurrentOptions(options1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(question2);
    setCurrentOptions(options2);
  };

  return  (
    <div className="d-flex flex-column min-vh-100 bg-light text-dark font-sans justify-content-between">
      <button
        className="btn btn-link text-start text-secondary p-3"
        onClick={previousQuestion}
      >
        &lt; Previous
      </button>

      <div className="flex-grow-1 px-3">
        <div className="bg-primary text-white p-4 rounded shadow text-center fs-5 fw-medium mb-4">
          {currentQuestion}
        </div>

        <div className="mb-4">
          {currentOptions.map((option, index) => (
            <div className="form-check mb-2" key={index}>
              <input
                className="form-check-input"
                type="radio"
                name="drink"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                id={`option-${index}`}
              />
              <label className="form-check-label" htmlFor={`option-${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>

        <button
          className="btn btn-success w-100 fw-semibold shadow-sm"
          disabled={!selectedOption}
          onClick={nextQuestion}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;