import AuthContext from "../../../Context/AuthContext";
import { ThemeDarkContext } from "../../../Context/ThemeContext";
import { useContext, useEffect } from "react";
import Style from './Dashboard.module.css'
import jwt from 'jsonwebtoken'
import { IUser } from "../../../Models/Interfaces/IUser";
export default function Dashboard(){
    const {themeCurrent } = useContext(ThemeDarkContext)
    const { user } = useContext(AuthContext)
    let iuser : IUser;
    useEffect(()=>{
        const token = user?.token;
        console.log(token);
        const secret = process.env.REACT_APP_JWTTOKEN;
        console.log(secret);
        if(token !== undefined && secret !== undefined){
            try {
                //const decode = jwt.verify(token, secret);
                //console.log(decode);
              } catch (error) {
                console.error('Erro ao verificar o token JWT:', error);
              }

        }

    }, [])
    return(
    <main className={`${Style.main} ${themeCurrent}`}>
        <div >
            <h4 className={Style.title}>Olá {user?.roles[0].roleName}  {user?.firstName} {user?.lastName}!</h4>
        </div>
    </main>)
}
