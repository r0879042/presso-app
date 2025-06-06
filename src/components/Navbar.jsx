import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.scss';
import homeIcon from "../assets/icons/adress.svg";
import findIcon from "../assets/icons/discover.svg";
import quizIcon from "../assets/icons/quiz.svg";
import cartIcon from "../assets/icons/cart.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="navbar">
      <div className={`nav-item ${currentPath === '/home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
        <img src={homeIcon} alt="Home" className='nav-icon' />
        <span>Home</span>
      </div>
      <div className={`nav-item ${currentPath === '/Find' ? 'active' : ''}`} onClick={() => navigate('/Find')}>
        <img src={findIcon} alt="Find" className='nav-icon'/>
        <span>Find</span>
      </div>
      <div className={`nav-item ${currentPath === '/quizinfo' || currentPath === '/quiz' ? 'active' : ''}`} onClick={() => navigate('/quizinfo')}>
        <img src={quizIcon} alt="Quiz" className='nav-icon' />
        <span>Quiz</span>
      </div>
      <div className={`nav-item ${currentPath === '/cart' ? 'active' : ''}`} onClick={() => navigate('/cart')}>
        <img src={cartIcon} alt="Cart" className='nav-icon' />
        <span>Cart</span>
      </div>
    </div>
  );
};

export default Navbar;