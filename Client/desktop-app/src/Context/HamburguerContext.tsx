import { useContext, createContext, ReactNode, useState, useEffect } from "react";
interface IHamburguer{
    onChange: (newValue: boolean) => void;
    state:boolean
}
interface IHamburguerContext{
    children:ReactNode
}
const HamburguerContext = createContext<IHamburguer>({} as IHamburguer)


export const HamburguerProvider = ({children}:IHamburguerContext) =>{
    const [ham, setHam] = useState(false);
    return(
        <HamburguerContext.Provider
        value={{
            onChange:setHam,
            state:ham
        }}>
            {children}
        </HamburguerContext.Provider>
    )
}

export { HamburguerContext };
