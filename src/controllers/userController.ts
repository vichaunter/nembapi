import {Request, RequestHandler, Response} from "express";
import {CallbackError} from 'mongoose'
import ICrudController from "../interfaces/controllers/ICrudController";
import UserModel, {IUserDocument} from "../models/UserModel";
import ROLES from "../constants/ROLES";
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'
import ERRORS from "../constants/ERRORS";
import {missingParams} from "../helpers/controllerHelpers";

export interface IUserController extends ICrudController {
    info: RequestHandler
    register: RequestHandler
    login: RequestHandler
}

/**
 * userController.login()
 */
const login = async (req: Request, res: Response) => {
    if (missingParams(Object.keys(req.body), res, ['email', 'password'])) {
        return
    }
    const {email, password} = req.body

    try {
        const user = await UserModel.findOne({email})
        if (user && await bcrypt.compare(password, user.password)) {
            const jwt = randomstring.generate(32)
            user.jwt = jwt
            await user.save()
            return res.status(200).json({
                jwt,
                email: user.email,
                role: user.role,
            })
        }

        return res.status(400).json({errors: [ERRORS.invalid]})
    } catch (err) {
        return res.status(500).json({errors: [ERRORS.unknown]})
    }
}

/**
 * userController.list()
 */
const list = (req: Request, res: Response) => {
    UserModel.find((err: CallbackError, docs: IUserDocument[]) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting list.',
                error: err
            });
        }

        return res.json(docs);
    });
}

/**
 * userController.view()
 */
const view = (req: Request, res: Response) => {
    const id = req.params.id;

    UserModel.findOne({_id: id}, (err: CallbackError, doc: IUserDocument) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting view.',
                error: err
            });
        }

        if (!doc) {
            return res.status(404).json({
                message: 'No such item'
            });
        }

        return res.json(doc);
    });
}

/**
 * userController.info()
 */
const info = (req: Request, res: Response) => {
    const {password, jwt, __v, ...user} = req.user.toObject()
    return res.json(user);
}

/**
 * userController.register()
 */
const register = async (req: Request, res: Response) => {
    if (missingParams(Object.keys(req.body), res, ['username', 'email', 'password'])) {
        return
    }
    const {username, email, password} = req.body

    const hashedPass = await bcrypt.hash(password, 12);
    const role = ROLES.user

    const user = await UserModel.findOne({email})
    if (user) {
        return res.status(404).json({
            message: 'Email already in use'
        });
    }

    const doc = new UserModel({username, email, password: hashedPass, role});
    doc.save((err: CallbackError, savedUser: IUserDocument) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating item',
                error: err
            });
        }

        return res.status(201).json({
            username: savedUser.username,
            email: savedUser.email,
            role: savedUser.role,
        });
    });
}


/**
 * userController.create()
 */
const create = (req: Request, res: Response) => {
    const {name, year} = req.body
    const doc = new UserModel({
        name,
        year
    });

    doc.save((err: CallbackError, doc: IUserDocument) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating item',
                error: err
            });
        }

        return res.status(201).json(doc);
    });
}

/**
 * userController.update()
 */
const update = (req: Request, res: Response) => {
    const id = req.params.id;
    const {username, email, password, role} = req.body

    UserModel.findOne({_id: id}, (err: CallbackError, doc: IUserDocument) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting item',
                error: err
            });

        }
        if (!doc) {
            return res.status(404).json({
                message: 'No such item'
            });
        }

        doc.username = username || doc.username;
        doc.email = email || doc.email;
        doc.password = password || doc.password;
        doc.role = role || doc.role;

        doc.save((err, doc: IUserDocument) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating item.',
                    error: err
                });
            }

            return res.json(doc);
        });
    });
}

/**
 * userController.remove()
 */
const remove = (req: Request, res: Response) => {
    const id = req.params.id;

    UserModel.findByIdAndRemove(id, {}, (err: CallbackError) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the car.',
                error: err
            });
        }

        return res.status(204).json();
    })
}

const userController: IUserController = {
    list,
    info,
    view,
    update,
    create,
    register,
    remove,
    login
}
export default userController