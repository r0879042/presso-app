import React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';
import '../styles/Previous.scss';

const Previous = ({ onClick }) => (
  <div className="previous-wrapper p-3">
    <button onClick={onClick} className="btn btn-link text-dark fw-bold p-0">
      <FaChevronLeft className="me-2" /> Previous
    </button>
  </div>
);



export default Previous;
