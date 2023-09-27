import Style from './Logo.module.css'
import imgLogo from '../../../../Assets/LogoEmpresa 1.svg'

export default function Logo(){
    return(
        <div className={Style.main}>
            <img className={Style.img_logo} src={imgLogo} alt="Rima"/>
            <label className={Style.text_logo} htmlFor="">Rima</label>
        </div>
    )
}
