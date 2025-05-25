import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/Popup.scss';

const Popup = ({ show, onContinue, onLeave }) => {
  return (
    <Modal
      show={show}
      onHide={onLeave}
      centered
      className="popup-modal"
      backdrop="static"
    >
      <Modal.Body>
        <h5>Leaving your order?</h5>
        <Button className="btn-checkout" onClick={onContinue}>
          Continue to check out
        </Button>
        <Button className="btn-leave" onClick={onLeave}>
          Leave anyway
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;