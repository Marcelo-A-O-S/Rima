interface IColumn{
    name:String
}

export default function ColumnName(props: IColumn){
    return(
        <td>{props.name}</td>
    )
}
