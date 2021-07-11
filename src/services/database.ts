import mongoose from "mongoose";
import config from "../config";

const {database} = config

const dbConfig: string = `mongodb://${database.dbUser}:${database.dbPass}@${database.dbHost}:${database.dbPort}/${database.dbName}`
const connect = () => {
    mongoose.connection
        .on('connected', () => console.log(`DB host '${database.dbHost}' connected`))
        .on('error', (err) => console.log(err))
        .on('disconnected', connect)
        .once('open', () => console.log(`DB name '${database.dbName}' opened`));

    return mongoose.connect(dbConfig, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export default connect
