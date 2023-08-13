import { Config } from '..'
import { App } from './app'
export * from './controllers/interfaces'
export * from './controllers'
export * from './routes'
export * from '../presentation'

export const start = async (config:Config)=>{
    new App({
        port: config.port
    }).getApp()
}

