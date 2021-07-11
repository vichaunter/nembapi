import {Request, Response} from "express";
import userModel, {IUserDocument} from "../models/UserModel";

declare global {
    namespace Express {
        export interface Request {
            user: IUserDocument;
        }
    }
}

const routerAuthenticatedMiddleware = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const jwt = req.headers.authorization?.replace(/^Bearer\s+/, "")
    const user = await userModel.findOne({jwt})
    if (!user) {
        return res.status(500).send('not logged in')
    }

    req.user = user

    next()
}

export default routerAuthenticatedMiddleware
