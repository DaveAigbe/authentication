import jwt from "jsonwebtoken";
import {Request, Response} from 'express'
import {User as userDB} from "../models/User.js";

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


export const checkUser = (req: Request, res: Response, next: any) => {
    const {jwt: token} = req.cookies

    if (token) {
        jwt.verify(token, 'i enjoy overwatch 2', async (err: any, decodedToken: any) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                res.clearCookie('jwt')
                next();
            } else {
                const user = await userDB.findById(decodedToken.id)

                if (user) {
                    res.locals.user = user
                }
                next();
            }
        })
    } else {
        res.locals.user = null
        next();
    }
}
