import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import '../styles/Recommendations.scss';
import backendURL from '../../backendURL';
import { transformCapsules } from '../others/transformCapsules';

const Recommendations = ({ setCart }) => {
  const navigate = useNavigate();
  let { sessionCode } = useParams();
  const [capsules, setCapsules] = useState([]);
  const [searchParams] = useSearchParams();
  const fromSessionCodePage = searchParams.get('from') === 'session';

 useEffect(() => {
     getRecommendations(sessionCode);
 }, []);

 const getRecommendations = () => {
    fetch(`${backendURL}/api/answercapsules/` + sessionCode)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Add price_id to each capsule
        const enriched = transformCapsules(data);
        setCapsules(enriched);
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
      <Container className="recommendation-page center">
          <div className="title">Recommended flavours to taste</div>
          {capsules.map((capsule, index) => (
            <Card key={index} className="flavor-card">
              <Row className="align-items-center">
                <Col xs={2} className="image-col">
                  <img src={`/capsules/${capsule.image}`} alt={capsule.name} className="flavor-image" />
                </Col>
                <Col xs={10} className="name-col">
                  <span className="flavor-name">{capsule.name} - {capsule.type}</span>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="button-group">
            <Button variant="success" className="action-button" disabled={fromSessionCodePage} onClick={printReceipt}>Print receipt</Button>
            <Button variant="success" className="action-button" onClick={goToCart}>Next</Button>
          </div>
      </Container>
    </div>
  );
};

export default Recommendations;