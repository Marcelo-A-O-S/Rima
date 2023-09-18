import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './AuthContext';

export const AuthSigned = () => {
    const {signed} = useContext(AuthContext)
    return(
        signed === true? <Outlet/>:
        <Navigate to="/Login" replace/>
    );
}
