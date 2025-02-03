import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { resetState } from '../../../redux/slices/userAuthorSlice';
import './FacultyProfile.css';

function FacultyProfile() {
    const stateObj = useSelector(state => state.userAuthorLoginReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem('token');
        dispatch(resetState());
        navigate('/');
    }

    return (
        <div className="author-profile-container">
            {/* <div className="profile-header">
                <h3 className='text-primary'>{stateObj.currentUser.username}</h3>
                <span>{stateObj.currentUser.usertype}</span>
                <h6 className='text-secondary'>{stateObj.currentUser.email}</h6>
                <li className="nav-item user-item">
                    <button className="nav-link"  onClick={logout}>Logout</button>
                </li>
            </div> */}
            <div className="profile-content">
                <div className="link-container">
                    <div className="profile-container">
                        <FaUserCircle className="profile-icon" />
                        <h3 className='profile-name'>{stateObj.currentUser.username}</h3>
                    </div>
                    <Link className="profile-link" to="dashboard">Profile</Link>
                    <Link className="profile-link" to="achievements/:username">Achievements</Link>
                    <Link className="profile-link" to="add-achievement">Add New Achievements</Link>
                </div>
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default FacultyProfile;
