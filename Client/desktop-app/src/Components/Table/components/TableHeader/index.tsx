import { ReactNode } from "react"

interface ITableHeader{
    namesColumns:string[],
    children:ReactNode
}

export default function TableHeader(props:ITableHeader){
    return(
        <th>
            {props.children}
        </th>
    )
}
