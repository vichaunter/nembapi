import {Response} from "express";

export const missingParams = (params: string[], res: Response, required: string[]) => {
    const missing: string[] = []

    required.map(r => {
        if (params.indexOf(r) < 0) {
            missing.push(r)
        }
    })

    const err = missing.length ? `Missing required parameters: ${missing}` : null
    if(err) {
        return res.status(400).json({
            error: err
        })
    }

    return null
}
