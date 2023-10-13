import { ReactNode } from "react"
import Style from './TableHeader.module.css'
interface ITableHeader{
    namesColumns?:string[],
    children:ReactNode,
    border?:boolean,
    expand?:boolean
}

export default function TableHeader(props:ITableHeader){
    return(
        <th className={`${Style.main} ${props.expand?Style.expand:""} ${props.border?Style.border:""}`}>
            {props.children}
        </th>
    )
}
