import React, { InputHTMLAttributes, HTMLInputTypeAttribute} from 'react';
import Style from './InputText.module.css'
interface IInputText{
    name:string;
    placeholder:string;
    element: HTMLInputTypeAttribute;
    required?: boolean;
    orientacao?:boolean;
    disabled?:boolean,
    value?:string,
    error?:string[],
    onChange?(newValue: any):any
}
export default function InputText(props: IInputText){
    function teste(){
        if(props.error!== undefined && props.error.length > 0){

        }
        return <></>
    }
    return(
        <div className={Style.input}>
            <label className={Style.inputLabel} htmlFor={props.name}>{props.name}</label>
            <input id={props.name} className={Style.inputText}
            type={props.element}
            name=""
            value={props.value}
            onChange={(value)=>{
                if(props.onChange !== undefined){
                    props.onChange(value)
                }
            }}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}/>
            {teste()}
        </div>
    )
}
