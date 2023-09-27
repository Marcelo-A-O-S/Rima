import { ReactNode } from "react"
import Style from './Form.module.css'
interface IForm{
    children:ReactNode
}

export default function Form(props:IForm){
    return(
        <form className={Style.form}>
            {props.children}
        </form>
    )
}
