import { start } from "./presentation";
import * as dotenv from 'dotenv'
import { startDatabase } from "./data/Connection";


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
        await start(config)
    }else{
        console.log("Erro em obter a porta de conexão")
    }
})()

