interface IButton{
    title:string;
    type: "button" | "submit" | "reset";

}

export default function ButtonCustom(props:IButton){
    return(
        <button
        id={props.title}
        name={props.title}
        type={props.type}>{props.title}</button>
    )
}
