import React, { useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Previous from '../components/Previous';
import '../styles/Recommendations.scss';

const Recommendations = ({ setCart }) => {
 const navigate = useNavigate();
 let { sessionCode } = useParams();
 const [capsules, setCapsules] = useState([]);

 useEffect(() => {
     getRecommendations(sessionCode);
 }, []);

 const getRecommendations = () => {
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

  const printReceipt = () => {
    navigate('/receipt', {
      state: {
        sessionCode: sessionCode,
        capsules: capsules,
      },
    });
  };

  const goToCart = () => {
    let cart = capsules.map(capsule =>
        ({ ...capsule, quantity: 1 })
    );
    setCart(cart);
    navigate('/cart');
  };

  return (
    <div>
      <Previous onClick={() => navigate(-1)} />
      <Container className="recommendation-page center">
          <div className="title">Recommended flavours to taste</div>
          {capsules.map((capsule, index) => (
            <Card key={index} className="flavor-card">
              <Row className="align-items-center">
                <Col xs={2} className="image-col">
                  <img src={"/src/assets/images/capsules/" + capsule.image} alt={capsule.name} className="flavor-image" />
                </Col>
                <Col xs={10} className="name-col">
                  <span className="flavor-name">{capsule.name} - {capsule.type}</span>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="button-group">
            <Button variant="success" className="action-button" onClick={printReceipt}>Print receipt</Button>
            <Button variant="success" className="action-button" onClick={goToCart}>Next</Button>
          </div>
      </Container>
    </div>
  );
};

export default Recommendations;