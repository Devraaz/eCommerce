import React, { useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

import { toast } from 'react-toastify';

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) {
        toast.info('You must be logged in to access this page.');
        return <Navigate to="/Login" state={{ from: location }} />;
    }


    return element

}

export default PrivateRoute