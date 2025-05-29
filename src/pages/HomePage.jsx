import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../styles/HomePage.scss";
import { Container, Row, Col, Card } from 'react-bootstrap';
import quiz from '../assets/images/coffee-quiz.png'
import code from '../assets/images/coffee-code.png'
import search from '../assets/images/coffee-search.png'
import logo from '../assets/images/logo.png'

const HomePage = () => {
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
        <div className="coffee-options">
            <Container className="my-4">
                <figure className="logo">
                    <img src={logo} alt="logo" className="img-fluid" />
                    <figcaption className="text-center">Presso</figcaption>
                </figure>
                <Row className="menu g-4 center">
                    <Col className="menuItem" md={4}>
                        <Card className="option-card shadow-sm" onClick={() => navigate('/quizinfo')}>
                            <Card.Body>
                                <Card.Title className="option-title">Coffee quiz</Card.Title>
                                <Card.Text className="option-text">This {numberOfquestions} question quiz will craft your ideal cup of coffee to try</Card.Text>
                                <img src={quiz} alt="Coffee quiz" className="option-image" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="menuItem" md={4}>
                        <Card className="option-card shadow-sm" onClick={() => navigate('/sessioncode')}>
                            <Card.Body>
                                <Card.Title className="option-title">Code</Card.Title>
                                <Card.Text className="option-text">Enter the code on your receipt to buy the coffee you tasted</Card.Text>
                                <img src={code} alt="Code" className="option-image" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="menuItem" md={4}>
                        <Card className="option-card shadow-sm" onClick={() => navigate('/find')}>
                            <Card.Body>
                                <Card.Title className="option-title">Find</Card.Title>
                                <Card.Text className="option-text">Browse our coffee collection and choose your favorite</Card.Text>
                                <img src={search} alt="Search" className="option-image" />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>  
        </div>     
  );
};

export default HomePage;