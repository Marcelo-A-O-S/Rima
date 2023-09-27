import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Style from './ItemMenu.module.css'
import { HamburguerContext } from "../../../../Context/HamburguerContext";

export interface IItemMenu{
    link: string ;
    imgIcon: string;
    textlink:string;
    item?: IItemMenu[];
    state?:boolean;
    onChance?: (newValue:any) => void;
}

export default function ItemMenu(props:IItemMenu){
    const {state} = useContext(HamburguerContext);
     return(
        props.state !== undefined && props.onChance !== undefined?
        <>
        <label className={Style.link} onClick={()=>{
            if(props.onChance !== undefined && props.state !== undefined){
                props.onChance(!props.state)
                console.log(props.state)
            }

        }}>
                <img className={Style.icon} src={props.imgIcon} alt={props.textlink} />
                <span className={`${Style.textlink} ${state?Style.activate:""}`}>{props.textlink}</span>
            </label>
            <div className={`${Style.list_item} ${props.state?Style.open:""}`}>
            {
                props.item?.map((item)=>{
                    return(
                            <Link className={Style.link} to={item.link}>
                                <img className={Style.icon} src={item.imgIcon} alt={props.textlink} />
                                <span  className={`${Style.textlink} ${state?Style.activate:""}`}>{item.textlink}</span>
                            </Link>
                        )
                    })
            }

            </div>
        </>
        :
        <>
        <Link className={Style.link} to={props.link}>
            <img className={Style.icon}  src={props.imgIcon} alt={props.textlink} />
            <span className={`${Style.textlink} ${state?Style.activate:""}`}>{props.textlink}</span>
        </Link>
        </>
    )
}
