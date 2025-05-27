import React from 'react';
import '../styles/Receipt.scss';
import { Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionCode, capsules } = location.state || { sessionCode: '', capsules: [] };

  function print() {
      window.print()
  }

  return (
    <div className="receipt-container" onClick={() => navigate('/')}>
      <Button variant="success" className="action-button m-3" onClick={print}>Print</Button>
      <Card className="receipt-card">
        <Card.Body>
          <div className="receipt-title">Receipt</div>
          <hr />
          <div className="receipt-items">{capsules.map(item => <div key={item.id}>{item.name + " - " + item.type + " - " + item.price_id}</div>)}</div>
          <hr />
          <div className="tasting-code-title">Tasting code</div>
          <div className="tasting-code">{sessionCode}</div>
          <hr />
          <div className="receipt-note">Use this code at the kiosk to buy the coffees you tasted.</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Receipt;