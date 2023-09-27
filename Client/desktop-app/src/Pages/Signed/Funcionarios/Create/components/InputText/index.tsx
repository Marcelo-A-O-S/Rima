import React, { InputHTMLAttributes, HTMLInputTypeAttribute} from 'react';
import Style from './InputText.module.css'
interface IInputText{
    name:string;
    placeholder:string;
    element: HTMLInputTypeAttribute;
    required?: boolean;
    orientacao?:boolean;
    disabled?:boolean
}
export default function InputText(props: IInputText){
    return(
        <div className={Style.input}>
            <label className={Style.inputLabel} htmlFor={props.name}>{props.name}</label>
            <input id={props.name} className={Style.inputText}
            type={props.element}
            name=""
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}/>
        </div>
    )
}
