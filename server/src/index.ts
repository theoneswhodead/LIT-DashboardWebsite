import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import userRouter from './routes/userRouter'
import dashboardRouter from './routes/dashboardRouter'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import passport from 'passport'
import session from 'express-session'
import './config/steamOauth';

const app: Express = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter)
app.use('/dashboard', dashboardRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(process.env.PORT, ()=> {
            console.log("Połączono z Bazą danych i rozpoczęto nasłuchiwanie na porcie ", process.env.PORT)
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })

