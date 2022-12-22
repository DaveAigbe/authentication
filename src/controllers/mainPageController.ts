import {RouteCallback} from "../types/RouteCallback.js";

export const getHomePage: RouteCallback = (req, res) => {
    res.render('home')
}

export const getSmoothiesPage: RouteCallback = (req, res) => {
    res.render('smoothies')
}
