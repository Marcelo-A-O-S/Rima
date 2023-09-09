import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev'
import path from 'path'

let window: null| BrowserWindow;
async function CreateWindow(){
    window = new BrowserWindow({
        width: 800,
        height: 600
    });
    window.loadURL(isDev? "http://localhost:3000/": `file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', async() => await CreateWindow());
app.on('activate', async() => {
    if(window === null){
        await CreateWindow()
    }
});
