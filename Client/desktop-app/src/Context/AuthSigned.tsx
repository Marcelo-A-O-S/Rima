import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './AuthContext';
import Header from '../Components/Header';
import Layout  from '../Components/Layout';

export const AuthSigned = () => {
    const {signed,user} = useContext(AuthContext)

    return(
        signed === true?
        <>
        <Layout
        children={<Outlet/>}/>
        </>:
        <Navigate to="/Login" replace/>
    );
}
