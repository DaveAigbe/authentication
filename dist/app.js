import express from "express";
import mongoose from "mongoose";
import { authRouter } from './routes/authRoutes.js';
import { mainPageRouter } from "./routes/mainPageRoutes.js";
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { checkUser } from "./middleware/authMiddleware.js";
const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
// view engine
app.set('view engine', 'ejs');
// database connection
const dbURI = process.env.DB_URI;
mongoose.set('strictQuery', true);
const connect = () => {
    if (dbURI) {
        mongoose
            .connect(dbURI, { dbName: 'node-auth' })
            .then(() => {
            return console.log(`Successfully connected database.`);
        })
            .catch(error => {
            console.error('Error connecting to database: ', error);
            return process.exit(1);
        });
    }
};
connect();
// routes
app.get('*', checkUser);
app.use(authRouter);
app.use(mainPageRouter);
app.listen(3000, () => {
    console.log('App is now listening on port 3000');
});
//# sourceMappingURL=app.js.map