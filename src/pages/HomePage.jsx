import React from "react";
import { useNavigate } from 'react-router-dom';
import "./../styles/HomePage.scss";
import Navbar from '../components/Navbar';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page container py-4">
        <div className="options-wrapper container">
            <div className="row">
                <div className="col-12 mb-4 d-flex justify-content-start">
                    <div className="circle-option" onClick={() => navigate('/quizstart')}>
                        <img src="" alt="Coffee Quiz" />
                        <div className="label">Coffee Quiz</div>
                    </div>
                </div>
                <div className="col-12 mb-4 d-flex justify-content-end">
                    <div className="circle-option" onClick={() => navigate('/')}>
                        <img src="" alt="Enter Code" />
                        <div className="label">Enter Code to<br />continue session</div>
                    </div>
                </div>
                <div className="col-12 mb-4 d-flex justify-content-start">
                    <div className="circle-option" onClick={() => navigate('/find')}>
                        <img src="" alt="Find" />
                        <div className="label">Find</div>
                    </div>
                </div>
            </div>
        </div>   
        <Navbar />  
    </div>
  );
};

export default HomePage;