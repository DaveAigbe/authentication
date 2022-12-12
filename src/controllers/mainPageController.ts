import {RouteCallbackT} from "../types/RouteCallbackT.js";

export const getHomePage: RouteCallbackT = (req, res) => {
    res.render('home')
}

export const getSmoothiesPage: RouteCallbackT = (req, res) => {
    res.render('smoothies')
}
