import jwt from "jsonwebtoken";
import {Request, Response} from 'express'

export const requireAuth = (req: Request, res: Response, next: any) => {
    const {jwt: token} = req.cookies

    // Check if json web token exists and verified
    if (token) {
        jwt.verify(token, 'i enjoy overwatch 2', (err: any, _: any) => {
            if (err) {
                res.redirect('/login')
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}
