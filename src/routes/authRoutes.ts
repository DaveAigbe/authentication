import {Router} from "express"
import * as authController from "../controllers/authController.js";


export const router = Router()

router.route('/signup')
    .get(authController.getSignup)
    .post(authController.postSignup)

router.route('/login')
    .get(authController.getLogin)
    .post(authController.postLogin)






