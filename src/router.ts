import {Application} from "express";
import exampleRouter from "./routers/exampleRouter";
import userRouter from "./routers/userRouter";

//TODO: change to auto import *Router.ts files
export default (app: Application) => {
    app.use('/example', exampleRouter)
    app.use('/user', userRouter)
};