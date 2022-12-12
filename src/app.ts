import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {router} from './routes/authRoutes.js'

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI: string = ''
const connect = () => {
    if (dbURI) {
        mongoose
            .connect(dbURI)
            .then(() => {
                return console.info(`Successfully connected to ${dbURI}`);
            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    }
};
connect();

app.use(router)

// routes
app.get('/', (req: Request, res: Response) => res.render('home'));
app.get('/smoothies', (req: Request, res: Response) => res.render('smoothies'));

app.listen(3000, () => {
    console.log('App is now listening on port 3000')
    console.log(dbURI)
})
