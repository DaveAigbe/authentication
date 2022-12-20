import express from "express";
import mongoose from "mongoose";
import { authRouter } from './routes/authRoutes.js';
import { mainPageRouter } from "./routes/mainPageRoutes.js";
import cookieParser from 'cookie-parser';
const app = express();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
// database connection
const dbURI = '';
mongoose.set('strictQuery', true);
const connect = () => {
    if (dbURI) {
        mongoose
            .connect(dbURI)
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
app.use(authRouter);
app.use(mainPageRouter);
app.listen(3000, () => {
    console.log('App is now listening on port 3000');
    console.log(dbURI);
});
//# sourceMappingURL=app.js.map