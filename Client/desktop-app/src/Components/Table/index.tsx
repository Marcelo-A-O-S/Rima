import { ReactNode } from "react";
import Style from './Table.module.css'

interface ITable{
    children:ReactNode
    border?:boolean
}

export default function Table(props:ITable){
    return(
        <table className={`${Style.main} ${props.border?Style.border:""}`}>
            {props.children}
        </table>
    )
}
