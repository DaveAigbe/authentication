import {Request, Response} from "express";
import {RouteCallbackT} from "../types/RouteCallbackT.js";
import {User} from "../models/User.js";
import {IUser} from "../types/IUser.js";
import jwt from 'jsonwebtoken'

const userDB = User

const handleErrors = (err: Error) => {
    console.log(err.message)
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id: any) => {
    return jwt.sign({id}, 'i enjoy overwatch 2', {
        expiresIn: maxAge
    })
}

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

        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
    } catch (err) {
        if (err instanceof Error) {
            handleErrors(err)
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
            handleErrors(err)
            res.status(400).json({err: err.message})
        }
    }
}
