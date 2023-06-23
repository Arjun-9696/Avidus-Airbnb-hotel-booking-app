import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignIn from '../Components/SignIn/SignIn';
import Signup from '../Components/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Error from '../Pages/Error';

const AllRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default AllRouter;