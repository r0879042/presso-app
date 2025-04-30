import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';
import homeIcon from "../assets/icons/adress.svg";
import findIcon from "../assets/icons/discover.svg";
import quizIcon from "../assets/icons/quiz.svg";
import cartIcon from "../assets/icons/cart.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar fixed-bottom bg-light border-top">
      <div className="container d-flex justify-content-around">
        <div className="nav-item" onClick={() => navigate('/')}>
          <img src={homeIcon} alt="Home" className='nav-icon' />
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/find')}>
          <img src={findIcon} alt="Find" className='nav-icon'/>
          <span>Find</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/quizstart')}>
          <img src={quizIcon} alt="Quiz" className='nav-icon' />
          <span>Quiz</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/cart')}>
          <img src={cartIcon} alt="Cart" className='nav-icon' />
          <span>Cart</span>
        </div>
      </div>     
    </div>
  );
};

export default Navbar;