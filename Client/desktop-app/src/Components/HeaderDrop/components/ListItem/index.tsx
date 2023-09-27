import Style from './ListItem.module.css'
import { ReactNode } from 'react'
interface IListItem{
    children: ReactNode
}

export default function ListItem(props:IListItem){
    return(
        <ul className={Style.listItem}>
            {props.children}
        </ul>
    )
}
