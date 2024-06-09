import path from 'path';
import { app, BrowserWindow } from "electron";
import { connectToMongoDb } from '../db/mongodb.js';
import { connectToElasticsearch } from '../db/elasticsearch.js';

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    try {
        await connectToMongoDb();
        await connectToElasticsearch();
    }
    catch (err) {
        console.error('There was an error connecting to the data sources. Please check environment variables if the databases are up and running. Error: ' + err);
        alert('Unable to establish a connection with the server. Please try again later.');
    }

    mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});