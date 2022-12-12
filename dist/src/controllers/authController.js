import { User } from "../models/User.js";
const userDB = User;
// Display signup form
export const getSignup = (req, res) => {
    res.render('signup');
};
// Display login form
export const getLogin = (req, res) => {
    res.render('login');
};
// Pull information from signup form and create new user in DB
export const postSignup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = {
            email: email,
            password: password
        };
        const user = await userDB.create(newUser);
        res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ err: err.message });
        }
    }
};
// Pull information from post form and authenticate user
export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userDB.find({ email: email, password: password });
        if (user) {
            res.json(user);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ err: err.message });
        }
    }
};
//# sourceMappingURL=authController.js.map