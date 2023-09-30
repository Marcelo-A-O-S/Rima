import { ReactNode } from "react"
import Style from './Form.module.css'
interface IForm{
    children:ReactNode,
    onSubmit?():void,
    border?:boolean,
    vertical?:boolean
}

export default function Form(props:IForm){
    return(
        <form onSubmit={props.onSubmit} className={`${Style.form} ${props.vertical?Style.vertical:""} ${props.border?Style.border:""}`}>
            {props.children}
        </form >
    )
}
