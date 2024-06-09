import { dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow } from "electron";
import { connectToMongoDB } from '../db/mongodb.js';
import { connectToElasticsearch } from '../db/elasticsearch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
        },
    });

    try {
        await connectToMongoDB();
        await connectToElasticsearch();
    }
    catch (err) {
        console.error('There was an error connecting to the data sources. Please check environment variables if the databases are up and running. Error: ' + err);
        alert('Unable to establish a connection with the server. Please try again later.');
    }

    mainWindow.loadURL(`http://localhost:3000`);

    if (process.env.NODE_ENV === 'production') {
        mainWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}`);
    }
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

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
})