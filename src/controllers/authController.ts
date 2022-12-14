import {Request, Response} from "express";
import {RouteCallback} from "../types/RouteCallback.js";
import {User as userDB} from "../models/User.js";
import {IUser} from "../types/IUser.js";
import jwt from 'jsonwebtoken'



const handleErrors = (err: Error) => {
    console.log(err.message)
}

// Equal to 1 day
const maxAge = 3 * 24 * 60 * 60
const createToken = (id: any) => {
    return jwt.sign({id}, 'i enjoy overwatch 2', {
        expiresIn: maxAge
    })
}

// Display signup form
export const getSignup: RouteCallback = (req: Request, res: Response) => {
    res.render('signup')
}

// Display login form
export const getLogin: RouteCallback = (req: Request, res: Response) => {
    res.render('login')
}

// Logout User
export const getLogout: RouteCallback = (req: Request, res: Response) => {
    res.clearCookie('jwt')
    res.redirect('/login')
}

// Pull information from signup form and create new user in DB
export const postSignup: RouteCallback = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const newUser: IUser = {
            email: email,
            hashedPassword: password
        }

        const user = await userDB.create(newUser)

        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

        res.redirect('/')
    } catch (err) {
        if (err instanceof Error) {
            handleErrors(err)
            res.status(400).json({err: err.message})
        }
    }
}

// Pull information from post form and authenticate user
export const postLogin: RouteCallback = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        const user = await userDB.login(email, password)

        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

        res.redirect('/')
    } catch (err) {
        if (err instanceof Error) {
            handleErrors(err)
            res.status(400).json({err: err.message})
        }
    }
}
