import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000); // auto-hide after 3s
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer className="position-fixed center">
      <Toast onClose={onClose} show={show} bg="warning" animation>
        <Toast.Body className="text-dark">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
