import { ReactNode, useEffect, useState } from "react"
import Style from "./Box.module.css"
export type TypesPadding = "small" | "medium" | "large" | "none" ;
interface IBox{
    children: ReactNode,
    vertical?:boolean,
    center?:boolean,
    border?:boolean,
    padding?: TypesPadding
}

export default function Box(props:IBox){
    const [ sizePadding, setSizePadding ] = useState("")
    useEffect(()=>{
        DimensionSizePadding()
    },[])
    function DimensionSizePadding(){
        var types: TypesPadding;
        if(props.padding !== undefined){
            if(props.padding === "none"){
                setSizePadding("")
            }
            if(props.padding === "small"){
                setSizePadding(Style.small)
            }
            if(props.padding === "medium"){
                setSizePadding(Style.small)
            }
            if(props.padding === "large"){
                setSizePadding(Style.small)
            }
        }
    }
    return(
        <div className={`${props.vertical?Style.vertical:Style.horizontal} ${props.border?Style.border:""} ${sizePadding}`}>
            {props.children}
        </div>
    )
}
