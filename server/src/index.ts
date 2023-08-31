import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import userRouter from './routes/userRouter'


const app: Express = express()

app.use(express.json())

app.use('/', userRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(process.env.PORT, ()=> {
            console.log("Połączono z Bazą danych i rozpoczęto nasłuchiwanie na porcie ", process.env.PORT)
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })

