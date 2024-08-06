import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {Spin} from 'antd';

const PrivateRoute = ({children}) => {
    const {isAuthenticated, loading} = useContext(AuthContext);
    if(loading) {
        return <Spin size='large'/>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
} ;
export default PrivateRoute;