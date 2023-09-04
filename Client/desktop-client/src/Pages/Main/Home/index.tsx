import React, {useContext} from 'react'
import { Outlet } from 'react-router-dom'
import '../../../index.css'
import { ThemeDarkContext } from '../../../Context/ThemeContext'


export default function Home() {
    const { themeCurrent } = useContext(ThemeDarkContext)
  return (
    <div className={`${themeCurrent}`}>
        <Outlet/>
    </div>

  )
}
