import { ReactNode } from "react"

interface ITable{
    children:ReactNode
}

export default function Table(props:ITable){
    return(
        <table className={""}>
            {props.children}
        </table>
    )
}
