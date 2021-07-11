import {Request, Response} from "express";
import {isAdmin} from "../repositories/userRepository";
import {IUserDocument} from "../models/UserModel";


const routerAdminMiddleware = async (
    req: Request,
    res: Response,
    next: Function
) => {
    if (!isAdmin(req.user)) {
        return res.status(500).send('not enough permissions')
    }

    next()
}

export default routerAdminMiddleware
