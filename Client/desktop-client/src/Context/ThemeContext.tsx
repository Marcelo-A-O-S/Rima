import {useContext, useState, createContext, ReactNode, useEffect } from 'react'

interface ITheme {
    themeCurrent: string,
    switchTheme():void
}

export const ThemeDarkContext = createContext({} as ITheme)

export const ThemeProvider = ({children}:any) =>{
    const [themeCurrent, setThemeCurrent ] = useState(`light`)
    const switchTheme = () : void =>{
        setThemeCurrent(themeCurrent === `dark`? `light`: `dark`)
    }

    return(
        <ThemeDarkContext.Provider value={{themeCurrent: themeCurrent, switchTheme} as ITheme}>
            {children}
        </ThemeDarkContext.Provider>
    )
}


