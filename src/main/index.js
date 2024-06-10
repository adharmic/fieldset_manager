import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import bodyParser from "body-parser";
import { connectToMongoDB } from "../db/mongodb.js";
import { connectToElasticsearch } from "../db/elasticsearch.js";
import routes from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();
server.use(bodyParser.json());
server.use("/api", routes);

// Serve the React app
const staticPath = join(__dirname, "../renderer/build");
server.use(express.static(staticPath));
server.get("*", (req, res) => {
  res.sendFile(join(staticPath, "index.html"));
});

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      webSecurity: false
    },
  });

  try {
    await connectToMongoDB();
    await connectToElasticsearch();
  } catch (err) {
    console.error("There was an error connecting to the data sources. Error: " + err);
    mainWindow.webContents.executeJavaScript("alert('Unable to establish a connection with the server. Please try again later.');");
  }

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadURL(`file://${join(staticPath, "index.html")}`);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Start Express server
server.listen(3000, () => {
  console.log("Express server listening on port 3000");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});