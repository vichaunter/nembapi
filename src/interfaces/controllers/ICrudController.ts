import {RequestHandler} from 'express'
export default interface ICrudController {
    list: RequestHandler
    view: RequestHandler
    create: RequestHandler
    update: RequestHandler
    remove: RequestHandler
}