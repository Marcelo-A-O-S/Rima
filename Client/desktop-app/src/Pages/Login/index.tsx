import React,{useState, useContext} from 'react'
import Logo from '../../Assets/LogoEmpresa 1.svg'
import Style from '../Login/login.module.css'
import LoginView from '../../ViewModel/LoginView'
import ButtonTheme from '../../Components/ButtonTheme'
import { User } from '../../Models/User'
import { Roles } from '../../Models/Roles'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ThemeDarkContext } from '../../Context/ThemeContext'
export default function Login() {
  const user = new User();
  const {themeCurrent} = useContext(ThemeDarkContext)
  const { SignIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, setLogin ] = useState<LoginView>({
    email: "",
    password: ""
  })
  async function ClearField(e: any){
    e.target.value = "";
  }

  async function UserResponse( response: Response){
    return await response.json().then(async (data)=>{
      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      data.roles.forEach((element: any) =>
        {
          const role = new Roles();
          role.roleName = element.roleName;
          role.typeid = element.typeid;
          user.roles.push(role);
        }
      );
      return user;
    })
  }
  async function SubmitLogin(e:any){
    e.preventDefault();
    const response = await fetch("https://localhost:7205/api/Authentication/Login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login)
    })

    const status = response.status;
    if(status === 200){
        const user = await UserResponse(response)
        console.log(user);
        console.log("Acessando serviços");
        await SignIn(user);
        navigate('/Signed');

    }
    if(status === 401)
     await response.json().then((data)=> {
      console.log(data);
      alert(data);
    })
    if(status === 404){
      await response.json().then((data)=>{
        alert(data);
      })
    }

  }

  return (
    <main className={themeCurrent}>
      <div className={Style.login}>
      <img src={Logo} alt={"Rima"} />
      <label className={Style.login_label_title}>Rima Industrial</label>
      <form onSubmit={(e)=>SubmitLogin(e)} className={Style.login_form}>
        <label className={Style.login_label} htmlFor="Email">Email</label>
        <input className={Style.login_input} type="email" name="" id="Email" placeholder='Digite o Email' required
        onClick={(e)=>ClearField(e)}
        onChange={(e) => setLogin(prevLogin =>
          ({
              ...prevLogin,
              email: e.target.value

           }))}/>
        <label className={Style.login_label} htmlFor="Senha">Senha</label>
        <input className={Style.login_input} type="text" name="" id="Senha"placeholder='Digite a Senha' required
        onClick={(e)=>ClearField(e)}
        onChange={(e) => setLogin(prevLogin =>
          ({
              ...prevLogin,
              password: e.target.value

           }))}/>
        <button className={Style.login_button} type='submit'>Acessar</button>
      </form>
      <ButtonTheme/>
    </div>
    </main>
  )
}
