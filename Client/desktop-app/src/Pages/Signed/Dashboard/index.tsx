import AuthContext from "../../../Context/AuthContext";
import { ThemeDarkContext } from "../../../Context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import Style from './Dashboard.module.css'
import jwt from 'jsonwebtoken'
import jwt_decode from "jwt-decode";
import { IUser } from "../../../Models/Interfaces/IUser";
import { AnyAaaaRecord } from "dns";
export default function Dashboard(){
    const {themeCurrent } = useContext(ThemeDarkContext)
    const { user } = useContext(AuthContext)
    const [ userPerfil, setUserPerfil] = useState<IUser>({} as IUser);
    useEffect(()=>{
        const token = user?.token;
        const secret = process.env.REACT_APP_JWTTOKEN;
        if(token !== undefined && secret !== undefined){
            try {

                const decode: any = jwt_decode(token);
                console.log(decode);
                setUserPerfil(prev =>{
                    return {
                        ...prev,
                        firstName : decode.firstName,
                        lastName : decode.lastName,
                    }
                })
              } catch (error) {
                console.error('Erro ao verificar o token JWT:', error);
              }

        }

    }, [])
    return(
    <main className={`${Style.main} ${themeCurrent}`}>
        <div >
            <h4 className={Style.title}>Olá {user?.roles[0].roleName}  {userPerfil.firstName} {userPerfil.lastName}!</h4>
        </div>
    </main>)
}
