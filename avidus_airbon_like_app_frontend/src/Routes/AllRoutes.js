import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import SignIn from '../Components/SignIn/SignIn';
import Signup from '../Components/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Error from '../Pages/Error';
import PropertyForm from '../Components/PrropertyForm/PropertyForm';
import Property from '../Components/Property/Property';
import UserProfile from '../Components/UserProfile/UserProfile';

const AllRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    // <PrivateRoute>
                        <Home />
                    // </PrivateRoute>
                }
            />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/property/:id" element={<Property/>} />
            <Route path="/propertyform" element={<PropertyForm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default AllRouter;