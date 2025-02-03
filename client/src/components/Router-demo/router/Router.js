import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Achievement from '../achievement/Achievement';
import AchievementsByFaculty from '../achievementsbyfaculty/AchievementsByFaculty';
import AddArticle from '../addarticle/AddArticle';
import Error from '../error/Error';
import FacultyProfile from '../facultyprofile/FacultyProfile';
import Home from '../home/Home';
import Login from '../login/Login';
import Main from '../main/Main';
import Register from '../register/Register';
import Achievements from '../achievements/Achievements';
import Dashboard from '../dashboard/Dashboard';




function Router() {
    let router = createBrowserRouter([
        {
            path: '',
            element: <Main />,
            errorElement: <Error />,
            children: [
                {
                    path: '',
                    element: <Navigate to='Home'/>
                },
                {
                    path:'all-achievements',
                    element: <Achievements/>
                },
                {
                    path: 'Home',
                    element: <Home />
                },
                {
                    path: 'Login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                },
                {
                    path: 'achievement/:achievementId',
                    element: <Achievement/>
                },
                {
                    path: '/dashboard',
                    element: <Dashboard/>
                },
                {
                    path: 'faculty-profile',
                    element: <FacultyProfile/>,
                    children:[
                        {
                            path: '',
                            element: <Navigate to='dashboard'/>
                        },
                        {
                            path: 'dashboard',
                            element: <Dashboard/>
                        },
                        {
                            path: 'add-achievement',
                            element: <AddArticle/>
                        },
                        {
                            path: 'achievements/:username',
                            element: <AchievementsByFaculty/>
                        },
                        {
                            path: 'achievement/:achievementId',
                            element: <Achievement/>,
                        },
                    ]
                },
            ]
        }
    ])

    return (
        <div className="App" >

            <RouterProvider router={router} />
            

        </div>
    );
}

export default Router