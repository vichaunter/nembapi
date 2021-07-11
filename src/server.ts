import express, {Application} from 'express'
import cors from 'cors'
import config from "./config";
import router from "./router";
import connectDb from "./services/database";
import bodyParser from "body-parser";

const app: Application = express();
app.use(cors())
app.use(bodyParser.json())

router(app)

connectDb().then(() => {
    listen()
});

const listen = () => {
    app.listen(config.server.port, () => {
        console.log(`Server listening at http://localhost:${config.server.port}`)
    })
}