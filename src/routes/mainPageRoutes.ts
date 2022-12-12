import {Router} from "express";
import * as mainPageController from '../controllers/mainPageController.js'


export const mainPageRouter: Router = Router()

mainPageRouter.get('/', mainPageController.getHomePage)

mainPageRouter.get('/smoothies', mainPageController.getSmoothiesPage)
