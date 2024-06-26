import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import cors from "cors";
require('dotenv').config();

let app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    credentials: true,
    origin: true
}));

viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);


let port = process.env.PORT || 6666;

app.listen(port, () => {
    console.log("BE on port: " + port);
});