import ExampleModel, {IExample} from '../models/exampleModel';
import {Request, Response} from "express";
import {CallbackError} from 'mongoose'
import ICrudController from "../interfaces/controllers/ICrudController";

export interface IExampleController extends ICrudController{}

/**
 * exampleController.list()
 */
const list = (req: Request, res: Response) => {
    ExampleModel.find((err: CallbackError, docs: IExample[]) => {
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
 * exampleController.view()
 */
const view = (req: Request, res: Response) => {
    const id = req.params.id;

    ExampleModel.findOne({_id: id}, (err: CallbackError, doc: IExample) => {
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
 * exampleController.create()
 */
const create = (req: Request, res: Response) => {
    const {name, year} = req.body
    const doc = new ExampleModel({
        name,
        year
    });

    doc.save((err: CallbackError, doc: IExample) => {
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
 * exampleController.update()
 */
const update = (req: Request, res: Response) => {
    const id = req.params.id;

    ExampleModel.findOne({_id: id}, (err: CallbackError, doc: IExample) => {
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

        doc.name = req.body.name ? req.body.name : doc.name;
        doc.year = req.body.year ? req.body.year : doc.year;

        doc.save((err, car: IExample) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when updating item.',
                    error: err
                });
            }

            return res.json(car);
        });
    });
}

/**
 * exampleController.remove()
 */
const remove = (req: Request, res: Response) => {
    const id = req.params.id;

    ExampleModel.findByIdAndRemove(id, {}, (err: CallbackError) => {
        if (err) {
            return res.status(500).json({
                message: 'Error when deleting the car.',
                error: err
            });
        }

        return res.status(204).json();
    })
}

const exampleController: IExampleController = {
    list,
    view,
    update,
    create,
    remove
}
export default exampleController