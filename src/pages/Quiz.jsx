import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Previous from "../components/Previous";
import { Row, Col, Container, Button } from "react-bootstrap";
import "../styles/Quiz.scss";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [currentSession, setCurrentSession] = useState("");
  // Get the correct backend url
  const backendURL = import.meta.env.VITE_BACKEND_API_URL;
  const [prevId, setPrevId] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");

  useEffect(() => {
    getQuestions();
  }, []);

  const getSessionAndSetAnswer = (selectedOption) => {
    fetch(`${backendURL}/api/session`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentSession(data);
        setAnswer(data, questions[currentQuestionId].id, selectedOption);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getQuestions = () => {
    fetch(`${backendURL}/api/question`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data != undefined) {
          setQuestions(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setAnswer = (sessionCode, questionId, answerId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionCode, questionId, answerId }),
    };

    fetch(`${backendURL}/api/sessionanswer`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Answer saved: " + JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setQuestion = (id) => {
    if (currentQuestionId === 0) {
      navigate(-1);
    } else {
      setAnimationDirection("prev");
      setPrevId(currentQuestionId);
      setAnimating(true);
      setCurrentQuestionId(id);
    }
  };

  const nextQuestion = (selectedOption) => {
    if (currentQuestionId < questions.length - 1) {
      setAnimationDirection("next");
      setPrevId(currentQuestionId);
      setAnimating(true);
      if (currentSession == "") {
        getSessionAndSetAnswer(selectedOption);
      } else {
        setAnswer(
          currentSession,
          questions[currentQuestionId].id,
          selectedOption,
        );
      }
      setCurrentQuestionId(currentQuestionId + 1);
    } else {
      setAnswer(
        currentSession,
        questions[currentQuestionId].id,
        selectedOption,
      );
      navigate("/recommendations/" + currentSession);
    }
  };

  const handleAnimationEnd = () => {
    setPrevId(null);
    setAnimating(false);
  };

  return (
    <div className="quiz">
      <Previous onClick={() => setQuestion(currentQuestionId - 1)} />
      <div className="center">
        <Container>
          <div
            className="question-wrapper"
          >
            {prevId !== null && (
              <div
                key={prevId}
                className={`slide ${animationDirection === "next" ? "slide-exit-next" : "slide-exit-prev"}`}
                style={{
                  position: "absolute",
                  width: "100%",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
                onAnimationEnd={handleAnimationEnd}
              >
                <h2>{questions[prevId].question}</h2>
                <Row className="answers justify-content-center flex-wrap mx-auto">
                  {questions[prevId] &&
                    questions[prevId].answers.map((option, index) => (
                      <Col
                        xs={questions[prevId].answers.length < 5 ? 12 / questions[prevId].answers.length : 2}
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <div
                          className={`option-card`}
                        >
                          <img
                            src={`/answers/${option.image}`}
                            alt={option.answer}
                            className="option-image"
                            style={{
                              height: questions[prevId].answers.length < 5 ? "22vh" : "15vh",
                              width: prevId == 1 ? "auto" : (questions[prevId].answers.length < 5 ? "22vh" : "15vh"),
                              borderRadius: prevId == 1 ? "20px" : "50%",
                            }}
                          />
                          <div className="option-text">
                            <p className="option-title">{option.answer}</p>
                            {option.description && <p>{option.description}</p>}
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
                {prevId == 3 ? (
                  <Button className="action-button none-btn" variant="default">
                    Not sure
                  </Button>
              ) : (<div></div>)}
              </div>
            )}
            <div
              key={currentQuestionId}
              className={`slide ${animating ? (animationDirection === "next" ? "slide-enter-next" : "slide-enter-prev") : ""}`}
              style={{
                position: "absolute",
                width: "100%",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
            >
              <h2 className="question">
                {questions[currentQuestionId] &&
                  questions[currentQuestionId].question}
              </h2>
              <Row className="answers justify-content-center flex-wrap mx-auto">
                {questions[currentQuestionId] &&
                  questions[currentQuestionId].answers.map((option, index) => (
                    <Col
                      xs={questions[currentQuestionId].answers.length < 5 ? 12 / questions[currentQuestionId].answers.length : 2}
                      key={index}
                      className="d-flex justify-content-center"
                    >
                      <div
                        className={`option-card`}
                        onClick={() => nextQuestion(option.id)}
                      >
                        <img
                          src={`/answers/${option.image}`}
                          alt={option.answer}
                          className="option-image"
                          style={{
                            height: questions[currentQuestionId].answers.length < 5 ? "22vh" : "15vh",
                            width: currentQuestionId == 1 ? "auto" : (questions[currentQuestionId].answers.length < 5 ? "22vh" : "15vh"),
                            borderRadius: currentQuestionId == 1 ? "20px" : "50%",
                          }}
                        />
                        <div className="option-text">
                          <p className="option-title">{option.answer}</p>
                          {option.description && <p className="description">{option.description}</p>}
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              {currentQuestionId == 3 ? (
                <Button className="action-button none-btn" variant="default" onClick={() => nextQuestion("")}>
                  Not sure
                </Button>
              ) : (<div></div>)}
            </div>
          </div>
          <div className="progress-tracker my-5">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`tracker-step ${index === currentQuestionId ? "active" : ""} ${index < currentQuestionId ? "completed" : ""}`}
                onClick={() => {
                  if (index < currentQuestionId) {
                    setQuestion(index);
                  }
                }}
                style={{
                  cursor: index < currentQuestionId ? "pointer" : "default",
                }}
              >
                <span className="tracker-number">{index + 1}</span>
                {index < questions.length - 1 && (
                  <span
                    className="tracker-line"
                    style={{ width: `calc(60vw / ${questions.length})` }}
                  ></span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Quiz;
