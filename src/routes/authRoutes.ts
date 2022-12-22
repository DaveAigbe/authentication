import {Router} from "express"
import * as authController from "../controllers/authController.js";


export const authRouter: Router = Router()

authRouter.route('/signup')
    .get(authController.getSignup)
    .post(authController.postSignup)

authRouter.route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin)

authRouter.route('/logout')
    .get(authController.getLogout)






