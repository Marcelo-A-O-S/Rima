import { ReactNode, createContext, useContext, useState } from "react";

interface IBell{
    onChange: (newValue: boolean) => void;
    state:boolean
}

interface IBellContext{
    children:ReactNode
}

export const BellContext = createContext<IBell>({} as IBell)

export const BellProvider = ({ children }:IBellContext) =>{
    const [bell, setBell] = useState(false)
    return(
        <BellContext.Provider value={
            {
                onChange:setBell,
            state:bell
        }
            }>
            {children}
        </BellContext.Provider>
    )
}
