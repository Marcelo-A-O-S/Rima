import { ReactNode } from "react"

interface ITableBody{
    children: ReactNode
}
export default function TableBody(props: ITableBody){
    return(
        <tbody>
            {props.children}
        </tbody>
    )
}
