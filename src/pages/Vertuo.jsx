import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import capsuleData from '../data/vertuo.json';
import '../styles/Vertuo.scss';
import { BsSearch } from 'react-icons/bs';
import { FaChevronLeft } from 'react-icons/fa6';
import { HiOutlineHome, HiOutlineShoppingCart } from 'react-icons/hi';
import { PiCoffeeLight } from 'react-icons/pi';
import { TbCoffee } from 'react-icons/tb';


const Vertuo = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const capsuleGroups = capsuleData.reduce((acc, capsule) => {
    if (!acc[capsule.type]) acc[capsule.type] = [];
    acc[capsule.type].push(capsule);
    return acc;
  }, {});

  return (
    <div className="vertuo-page container-fluid">
      <div className="header">
        <Link to="/" className="back-btn">
          <FaChevronLeft /> Previous
        </Link>
        <div className="toggle-buttons d-flex justify-content-center mt-3">
          <Link to="/find-product" className="btn btn-outline-light original">Original</Link>
          <button className="btn btn-light active">Vertuo</button>
        </div>
        <div className="search-bar mt-3">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search capsules"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="capsule-section">
        {Object.entries(capsuleGroups).map(([type, capsules]) => {
          const filtered = capsules.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filtered.length === 0) return null;

          return (
            <div key={type} className="capsule-group">
              <h5 className="group-title">{type}</h5>
              <div className="row">
                {filtered.map((capsule, idx) => (
                  <div key={idx} className="col-4 text-center capsule-card">
                    <div className="capsule-img-box">
                      <img src={capsule.image} alt={capsule.name} />
                    </div>
                    <div className="capsule-label">{capsule.name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-nav d-flex justify-content-around align-items-center">
        <Link to="/" className="nav-icon"><HiOutlineHome size={24} /><div>Home</div></Link>
        <Link to="/find-product" className="nav-icon"><TbCoffee size={24} /><div>Find</div></Link>
        <Link to="/quiz" className="nav-icon"><PiCoffeeLight size={24} /><div>Quiz</div></Link>
        <Link to="/cart" className="nav-icon"><HiOutlineShoppingCart size={24} /><div>Cart</div></Link>
      </div>
    </div>
  );
};

export default Vertuo;


