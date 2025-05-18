import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/Recommendations.scss';

const Recommendations = () => {
 const navigate = useNavigate();
 let { sessionCode } = useParams();
 const [capsules, setCapsules] = useState([]);

 useEffect(() => {
     getRecommendations(sessionCode);
 }, []);

 const getRecommendations = () => {
    console.log(sessionCode);
    fetch('http://127.0.0.1:8000/api/answercapsules/' + sessionCode)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCapsules(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className="recommendation-page">
      <Previous onClick={() => navigate(-1)} />
      <div className="title">Recommended flavours to taste</div>
      {capsules.map((capsule, index) => (
        <Card key={index} className="flavor-card">
          <Row className="align-items-center">
            <Col xs={2} className="image-col">
              <img src={"/src/assets/images/" + capsule.image} alt={capsule.name} className="flavor-image" />
            </Col>
            <Col xs={10} className="name-col">
              <span className="flavor-name">{capsule.name}</span>
            </Col>
          </Row>
        </Card>
      ))}
      <div className="button-group">
        <Button variant="success" className="action-button">Print receipt</Button>
        <Button variant="success" className="action-button">Next</Button>
      </div>
    </Container>
  );
};

export default Recommendations;