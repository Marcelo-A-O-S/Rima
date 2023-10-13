import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { IUser } from '../Models/Interfaces/IUser'

export const ApiBackEnd = axios.create({
    baseURL:process.env.REACT_APP_API,
    headers:{
        "Content-Type":"application/json"
    }
})

export const ApiBackPrivate = (user: IUser) =>{
    const token = `Bearer ${user.token}`;
    return axios.create({
        baseURL:process.env.REACT_APP_API,
        headers:{
            "Content-Type":"application/json",
            "Authorization": `${token}`
        }
    })
}
