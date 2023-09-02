import { start } from "./presentation";
import * as dotenv from 'dotenv'
import { startDatabase } from "./data/Connection";
import { ConfigAdmiministrativa } from "./services";


dotenv.config({
    override: true
})

export interface Config {
    port:number
}
(async ()=>{
    const portEnv: string | undefined = process.env.PORT
    if(portEnv != undefined){
        const config: Config = {
            port: parseInt(portEnv)
        }
        await startDatabase();
        await ConfigAdmiministrativa();
        await start(config)
    }else{
        console.log("Erro em obter a porta de conexão")
    }
})()

