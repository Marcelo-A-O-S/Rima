
import Logo from '../../Assets/LogoEmpresa 1.svg'
import Style from '../Login/login.module.css'

import ButtonTheme from '../../Components/ButtonTheme'

export default function Login() {
  return (
    <div className={Style.login}>
      <img src={Logo} alt={"Rima"} />
      <label className={Style.login_label_title}>Rima Industrial</label>
      <form className={Style.login_form}>
        <label className={Style.login_label} htmlFor="Email">Email</label>
        <input className={Style.login_input} type="text" name="" id="Email" placeholder='Digite o Email' />
        <label className={Style.login_label} htmlFor="Senha">Senha</label>
        <input className={Style.login_input} type="text" name="" id="Senha"placeholder='Digite a Senha' />
      </form>
      <ButtonTheme/>
    </div>
  )
}
