import {Request, Response} from "express";
import {RouteCallbackT} from "../types/RouteCallbackT.js";
import {User} from "../models/User.js";
import {IUser} from "../types/IUser.js";

const userDB = User

// Display signup form
export const getSignup: RouteCallbackT = (req: Request, res: Response) => {
    res.render('signup')
}

// Display login form
export const getLogin: RouteCallbackT = (req: Request, res: Response) => {
    res.render('login')
}

// Pull information from signup form and create new user in DB
export const postSignup: RouteCallbackT = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const newUser: IUser = {
            email: email,
            password: password
        }

        const user = await userDB.create(newUser)
        res.status(200).json(user)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({err: err.message})
        }
    }
}

// Pull information from post form and authenticate user
export const postLogin: RouteCallbackT = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const user = userDB.find({email: email, password: password})

        if (user) {
            res.json(user)
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({err: err.message})
        }
    }
}
