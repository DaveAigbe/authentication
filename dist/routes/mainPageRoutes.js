import { Router } from "express";
import * as mainPageController from '../controllers/mainPageController.js';
import { requireAuth } from "../middleware/authMiddleware.js";
export const mainPageRouter = Router();
mainPageRouter.get('/', mainPageController.getHomePage);
mainPageRouter.get('/smoothies', requireAuth, mainPageController.getSmoothiesPage);
//# sourceMappingURL=mainPageRoutes.js.map