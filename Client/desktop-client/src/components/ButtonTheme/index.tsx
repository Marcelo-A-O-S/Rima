import React,{useContext} from 'react'
import { ThemeDarkContext } from '../../Context/ThemeContext'
import Style from '../ButtonTheme/ButtonTheme.module.css'
import ImgSun from '../../assets/emojione_sun.svg'
import ImgMoon from '../../assets/pepicons-print_moon.svg'

export default function ButtonTheme() {
    const { themeCurrent, switchTheme } = useContext(ThemeDarkContext)
    function updateTheme(){
       switchTheme()
    }
  return (
    <div className={Style.button_position}>
      <button className={`${Style.button_theme} ${themeCurrent === 'light' ? 'dark' : 'light'}`} onClick={updateTheme}>
        {themeCurrent === 'light'? <img className={Style.button_image} src={ImgMoon}/>: <img className={Style.button_image} src={ImgSun}/>}
      </button>
    </div>
  )
}
