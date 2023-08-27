import {app, BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

let window : BrowserWindow | null;

async function CreateWindow(){
    window = new BrowserWindow({
        height:400,
        width:600
    });
    window.loadURL(isDev ?"http://localhost:3000/": `file://${path.join(__dirname, '../build/index.html')}`);
}
app.on('ready',CreateWindow);

app.on('activate',async ()=>{
    if(window === null){
        await CreateWindow()
    }
})
