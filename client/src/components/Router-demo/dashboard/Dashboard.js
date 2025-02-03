import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
    let { register, handleSubmit, formState: { errors }, reset } = useForm();
    let stateObj = useSelector(state => state.userAuthorLoginReducer);
    const [isEditing, setIsEditing] = useState(false);
    const [facultyDetails, setFacultyDetails] = useState({});
    let [err, setErr] = useState();
    const navigate = useNavigate();

    const getDetailsOfCurrentFaculty = async () => {
        const token = localStorage.getItem('token');
        const axiosWithToken = axios.create({
            headers: { Authorization: `Bearer ${token}` }
        });
        let res = await axiosWithToken.get(`http://localhost:5000/user-api/faculty-details/${stateObj.currentUser.username}`);
        console.log("response", res);
        setFacultyDetails(res.data.payload);
        reset(res.data.payload);
    };

    useEffect(() => {
        getDetailsOfCurrentFaculty();
    }, []);

    const onSubmit = async (userData) => {
        console.log("userdata", userData);
        let combinedData = { ...userData, ...stateObj.currentUser };
        delete combinedData._id;
        console.log("combined data", combinedData);

        try {
            const token = localStorage.getItem('token');
            const axiosWithToken = axios.create({
                headers: { Authorization: `Bearer ${token}` }
            });
            let res = await axiosWithToken.put('http://localhost:5000/user-api/faculty-details', combinedData);
            console.log(res);
            setIsEditing(false);
            getDetailsOfCurrentFaculty();
        } catch (error) {
            console.error("There was an error updating the user!", error);
            setErr('There was an error updating the user');
        }
    };

    return (
        <div>
            
            <div className='details-container'>
                {!isEditing ? (
                    <div className='faculty-details'>
                    <div className='details-heading'>
                    <h2 className="details-title">Faculty Information</h2>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                        <FaEdit /> Edit
                    </button>
                    </div>
                    <table className="faculty-table">
                        <tbody>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>{facultyDetails.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{facultyDetails.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Department:</strong></td>
                                <td>{facultyDetails.department}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone Number:</strong></td>
                                <td>{facultyDetails.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Address:</strong></td>
                                <td>{facultyDetails.address}</td>
                            </tr>
                            <tr>
                                <td><strong>Designation:</strong></td>
                                <td>{facultyDetails.designation}</td>
                            </tr>
                            <tr>
                                <td><strong>Date of Birth:</strong></td>
                                <td>{facultyDetails.dob}</td>
                            </tr>
                            <tr>
                                <td><strong>Gender:</strong></td>
                                <td>{facultyDetails.gender}</td>
                            </tr>
                            <tr>
                                <td><strong>Qualifications:</strong></td>
                                <td>{facultyDetails.qualifications}</td>
                            </tr>
                            <tr>
                                <td><strong>Experience:</strong></td>
                                <td>{facultyDetails.experience} years</td>
                            </tr>
                            <tr>
                                <td><strong>Research Interests:</strong></td>
                                <td>{facultyDetails.researchInterests}</td>
                            </tr>
                            <tr>
                                <td><strong>Publications:</strong></td>
                                <td>{facultyDetails.publications}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ) : (
                    <div className='form-container'>
                        <form className="faculty-form" onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="form-title">Edit Faculty Information</h2>
                            <div className="input-container inline">
                                <div className="input-item">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                                </div>
                                <div className="input-item">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>
                            </div>
                            <div className="input-container inline">
                                <div className="input-item">
                                    <label htmlFor="department">Department</label>
                                    <input
                                        type="text"
                                        id="department"
                                        {...register('department', { required: 'Department is required' })}
                                    />
                                    {errors.department && <span className="error-message">{errors.department.message}</span>}
                                </div>
                                <div className="input-item">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register('phone', { required: 'Phone number is required' })}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                                </div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    {...register('address', { required: 'Address is required' })}
                                />
                                {errors.address && <span className="error-message">{errors.address.message}</span>}
                            </div>
                            <div className="input-container inline">
                                <div className="input-item">
                                    <label htmlFor="designation">Designation</label>
                                    <input
                                        type="text"
                                        id="designation"
                                        {...register('designation', { required: 'Designation is required' })}
                                    />
                                    {errors.designation && <span className="error-message">{errors.designation.message}</span>}
                                </div>
                                <div className="input-item">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        {...register('dob', { required: 'Date of Birth is required' })}
                                    />
                                    {errors.dob && <span className="error-message">{errors.dob.message}</span>}
                                </div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" {...register('gender', { required: 'Gender is required' })}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <span className="error-message">{errors.gender.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="qualifications">Qualifications</label>
                                <textarea
                                    id="qualifications"
                                    {...register('qualifications', { required: 'Qualifications are required' })}
                                ></textarea>
                                {errors.qualifications && <span className="error-message">{errors.qualifications.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="experience">Experience (in years)</label>
                                <input
                                    type="number"
                                    id="experience"
                                    {...register('experience', { required: 'Experience is required' })}
                                />
                                {errors.experience && <span className="error-message">{errors.experience.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="research-interests">Research Interests</label>
                                <textarea
                                    id="research-interests"
                                    {...register('researchInterests', { required: 'Research Interests are required' })}
                                ></textarea>
                                {errors.researchInterests && <span className="error-message">{errors.researchInterests.message}</span>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="publications">Publications</label>
                                <textarea
                                    id="publications"
                                    {...register('publications', { required: 'Publications are required' })}
                                ></textarea>
                                {errors.publications && <span className="error-message">{errors.publications.message}</span>}
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                )}
            </div>
            <Outlet />
        </div>
    );
}

export default Dashboard;
