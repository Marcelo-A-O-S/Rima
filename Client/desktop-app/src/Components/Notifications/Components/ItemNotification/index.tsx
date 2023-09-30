import Style from './ItemNotification.module.css'

interface IItemNotification{
    message?:string
}

export default function ItemNotification(props: IItemNotification){
    return(
        <div className={Style.main}>
            <label className={Style.message} htmlFor="">{props.message}</label>
            <div className={Style.actions}>
                <button>Visualizar</button>
                <button>Marcar como lida</button>
            </div>
        </div>
    )
}
