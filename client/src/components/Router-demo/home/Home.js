import React, { useState } from 'react';
import './Home.css';
import Login from '../login/Login';
import Register from '../register/Register';
import Achievements from '../achievements/Achievements';

function Home() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='home-container' id='about'>
            <div className='hero-section'>
                <div className='container text-center'>
                    <div className='hero-overlay'>
                        <h1 className='hero-title'>Welcome to the Faculty Achievement Portal</h1>
                        <p className='hero-subtitle'>Showcasing Excellence and Achievements</p>
                        <div className='main-login'>
                            <div className='form-switch'>
                                <button 
                                    className={`form-toggle-btn ${isLogin ? 'active' : ''}`} 
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </button>
                                <button 
                                    className={`form-toggle-btn ${!isLogin ? 'active' : ''}`} 
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </button>
                            </div>
                            {isLogin ? <Login /> : <Register />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='content container'>

                <section  className='intro py-5'>
                <h1 className='about-title text-center text-primary'>About</h1>
                    <p className='description'>
                        The Faculty Achievement Portal is an online platform designed to showcase and recognize the professional accomplishments of faculty members within our academic institution. This portal serves as a comprehensive repository of achievements, fostering a culture of excellence and continuous improvement.
                    </p>
                </section>
                <section id='features' className='features py-5'>
                    <h2 className='features-title text-center text-primary'>Key Features</h2>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='feature-box'>
                                <h4>Detailed Profiles</h4>
                                <p>Comprehensive profiles highlighting individual faculty achievements and contributions.</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='feature-box'>
                                <h4>Achievement Highlights</h4>
                                <p>Showcasing significant accomplishments and milestones.</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='feature-box'>
                                <h4>Search and Filter</h4>
                                <p>Easy access to specific achievements through search and filter options.</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='feature-box'>
                                <h4>Interactive Dashboards</h4>
                                <p>Visual representation of data and achievements.</p>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='feature-box'>
                                <h4>Secure Submissions</h4>
                                <p>Ensuring the integrity and confidentiality of submitted information.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='benefits' className='benefits py-5'>
                    <h2 className='benefits-title text-center text-primary '>Benefits</h2>
                    <p className='benefits-description'>
                        The portal enhances motivation and morale by celebrating success, promotes transparency and accountability with clear record-keeping, and fosters collaboration and networking opportunities. It also bolsters the institution’s reputation by highlighting faculty strengths, aids in professional development by documenting career progress, and serves as a valuable resource for performance reviews and promotions.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Home;
