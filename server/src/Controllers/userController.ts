import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const createToken = (_id: object, time: string) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)
        const username = user.username
        const token = createToken(user._id, '3d')

        res.status(200).json({ username , email, token})

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const userSignup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {

        const user = await User.signup(username, email, password)
        const token = createToken(user._id, '3d')

        res.status(200).json({username, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const userForgot = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {

        const user = await User.forgot(email)
        const token = createToken(user._id, '1m')
        const base64Token = Buffer.from(token).toString("base64");

        const link = `http://localhost:5173/reset-password/${user._id}/${base64Token}`
 
        console.log(link) // send to email

       res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const userResetPassword = async (req: Request, res: Response) => {

    const { id, token, username, email, password } = req.body;

    console.log(id, username, email, password)

    try {

        const decodedToken = Buffer.from(token, "base64").toString("utf-8");

       jwt.verify(decodedToken, process.env.SECRET, async (error) => {
            if(error) {
                console.log('Token prawdopodobnie wygasł')
                return res.json({error: 'Token prawdopodobnie wygasł'})
            } else {
                const user = await User.resetPassword(id, username, email, password)
        
                 res.status(200).json(user)

            }
       })

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}