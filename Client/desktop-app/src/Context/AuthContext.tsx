import React, {createContext , useState , useEffect} from "react";
import { User } from "../Models/User";
import {IUser} from "../Models/Interfaces/IUser";
import { useNavigate } from "react-router-dom";
import jwt from 'jsonwebtoken'

interface AuthUser {
    user: IUser | null,
    signed: boolean,
    SignIn(BodyUser:object): Promise<void>,
    VerificarUsuario(): void,
    SignOut():Promise<void>
}


const AuthContext = createContext<AuthUser>({} as AuthUser);



export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<IUser|null>({} as IUser)
    const [signed, setSigned] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(()=>{
        async function VerificarAutenticacao(){
            const UserStorage = localStorage.getItem("user");
            if(UserStorage){
                var secret = process.env.REACT_APP_JWTTOKEN;
                if(secret !== undefined){

                }
                setUser(JSON.parse(UserStorage));
                setSigned(true);
                navigate("/Signed");

            }
        }
        VerificarAutenticacao()

    },[])
    async function VerificarUsuario(){
        console.log(user)
        console.log(signed)
    }
    async function SignIn(BodyUser:User){
        setUser(BodyUser);
        setSigned(true);

        localStorage.setItem("user", JSON.stringify(BodyUser))

    }
    async function SignOut(): Promise<void>{
        setUser(null);
        setSigned(false);
        localStorage.removeItem("user")
        localStorage.clear()

    }
    async function GetToken(){
        localStorage.getItem("token")
    }
    return(
        <AuthContext.Provider value={{ signed: signed, user: user, SignIn, VerificarUsuario, SignOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
