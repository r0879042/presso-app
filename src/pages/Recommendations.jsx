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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    return (
      <div className="center bg-white"
      style={{
        height: "100vh"
      }}>
        <p style={{
          fontSize: "3rem",
          marginBottom: "20px"
        }}>Your coffee is brewing...</p>
        <video
          src="/loading.mp4"
          autoPlay
          muted
          playsInline
          className="w-64 h-64"
        />
      </div>
    );
  } 

  return (
    <div>
      <Container className="recommendation-page center">
          <div className="title">We think we've found something you'll love...
                  <img
                    src={`/beans.png`}
                    alt="beans"
                  /></div>
          <p className="subtitle">For adventurous flavour profiles, and good milk synergy, we have recommended our most naturally sweet, medium roast coffees.</p>
          <Row>
            {capsules.map((capsule, index) => (
              <Col xs={12} md={4}>
                <div className="capsule-card" key={index}>
                  <img
                    src={`/capsules/${capsule.image}`}
                    alt={capsule.name}
                    onClick={() =>
                      navigate("/flavour", { state: { capsule, from: "/find" } })
                    }
                    style={{ cursor: "pointer" }}
                  />
                  <p className="capsule-name">{capsule.name} - {capsule.type}</p>
                  <p>{capsule.tastes}</p>
                  <div className="roast-container">
                    <p className="roast-label">Roast:</p>
                    <div className="roast-dots">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`dot ${i < capsule.roast ? "filled" : ""}`}
                        />
                      ))}
                    </div>
                  </div>            
                </div>
              </Col>
              ))}
          </Row>    
          <div className="button-group">
            <Button variant="success" className="action-button" disabled={fromSessionCodePage} onClick={printReceipt}>Show QR code for tasting</Button>
            <Button variant="success" className="action-button" onClick={goToCart}>Proceed to cart</Button>
          </div>
      </Container>
    </div>
  );
};

export default Recommendations;