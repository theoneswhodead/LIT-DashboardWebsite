import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import 'dotenv/config'

const app: Express = express()

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(process.env.PORT, ()=> {
            console.log("Połączono z Bazą danych i rozpoczęto nasłuchiwanie na porcie ", process.env.PORT)
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })

