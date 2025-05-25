import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SessionCode.scss';
import Previous from '../components/Previous';
import Navbar from '../components/Navbar';
import ToastMessage from '../components/ToastMessage';
import { Container, Button } from 'react-bootstrap';

const SessionCode = ({ setCart }) => {
  const [showToast, setShowToast] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();
 const backendURL = import.meta.env.VITE_BACKEND_API_URL;


    const checkSession = () => {
      fetch(`${backendURL}/api/session/` + code)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.code === code) {
            getRecommendations();
            navigate('/cart'); 
          }
          else{
            setShowToast(true)
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };

   const getRecommendations = () => {
    fetch(`${backendURL}/api/answercapsules/` + code)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let cart = data.map(capsule =>
          ({ ...capsule, quantity: 1 })
        );
        setCart(cart);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = () => {
    if (code.length === 4) {
      checkSession(code);
    }
  };

  return (
    <div>
      <Previous onClick={() => navigate(-1)} />
      <Container className="session-page">
        <h2 className="code-title">Enter session code to continue</h2>
        <input
          type="text"
          maxLength="4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-input"
        />

        <Button variant="success" className="action-button" onClick={handleSubmit} disabled={code.length !== 4}>
          →
        </Button>
        <ToastMessage
          show={showToast}
          message="The code you entered doesn't exist!"
          onClose={() => setShowToast(false)}
        />
      </Container>
      <Navbar />
    </div>
  );
};

export default SessionCode;