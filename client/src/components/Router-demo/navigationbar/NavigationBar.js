import React from 'react';
import { FaHome, FaSignOutAlt, FaTrophy } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { resetState } from '../../../redux/slices/userAuthorSlice';
import './NavigationBar.css';

function NavigationBar() {
    let { loginUserStatus, currentUser } = useSelector(state => state.userAuthorLoginReducer);
    let dispatch = useDispatch();

    function logout() {
        //remove item from local storage
        localStorage.removeItem('token');
        dispatch(resetState());
    }

    return (
        <div>
            <nav className="main-nav">
                <div className="container-fluid">
                    <div className="nav-header">
                        <a href="#" className="nav-logo" >
                            <img src="https://vnrvjiet.ac.in/assets/images/Header Logo.png" alt="Header Logo" />
                        </a>
                        <div className="nav-links">
                            <ul>

                                {loginUserStatus === false ? (
                                    <>
                                        <li>
                                            <NavLink className="nav-link " to="/Home"><FaHome /> Home</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="nav-link " to="/all-achievements"><FaTrophy /> Achievements</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <div className='login-menu'>
                                        {/* <li className="user-info">
                                            <FaUserCircle className="user-icon" /> {currentUser.username}
                                        </li> */}
                                        <li>
                                            <NavLink className="logout-link " to="/" onClick={logout}><FaSignOutAlt /> Logout</NavLink>
                                        </li>
                                        </div>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;
