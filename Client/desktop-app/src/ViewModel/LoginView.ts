class LoginView{
    public email:string;
    public password:string;
    public constructor(_email= "", _password = ""){
        this.email = _email;
        this.password = _password;
    }
}
export default LoginView
