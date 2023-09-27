import {ReactNode} from 'react'
import Style from './Container.module.css'
import { useContext } from "react"
import { ThemeDarkContext } from "../../Context/ThemeContext"
interface IContainer{
    children: ReactNode
}


export default function Container(props:IContainer){
    const {themeCurrent} = useContext(ThemeDarkContext)
    return(
    <div className={`${Style.container} ${themeCurrent}`}>
        {props.children}
    </div>)
}
