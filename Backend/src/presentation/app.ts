import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { Config } from '..';
import { RolesRoute } from './routes/RolesRoute';
import { AuthRoute } from './routes/AuthRoute';
import { TypeRoleRoute } from './routes/TypeRoleRoute';
import { EmployeesRoute } from './routes/EmployeesRoute';



interface propsApp{
    port:number;
}
export class App{
    private server: express.Application;
    private port: number;
    constructor(props: Config){
        this.server = express();
        this.port = props.port;
        this.listen(this.port);
        this.middleware();
        this.routes();
    }
    getApp():express.Application{
        return this.server;
    }
    listen(port:number):void{
        this.server.listen(port,()=>{
            console.log(`Escutando na porta: http://localhost:${port}`);
        })
    }
    private middleware(){
        console.log('Configurando middleware...');
        this.server.use(cors());
        this.server.use(bodyParser.json());
        console.log('Middleware configurado!');
    }
    private routes(){
        this.server.use('/employees', EmployeesRoute());
        this.server.use('/roles', RolesRoute());
        this.server.use('/auth', AuthRoute());
        this.server.use('/typeRole', TypeRoleRoute());
    }
}
