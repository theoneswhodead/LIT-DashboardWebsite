import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const createToken = (_id: object) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const userSignup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {

        const user = await User.signup(username, email, password)
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const userForgot = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {

        const user = await User.forgot(email)
        const token = createToken(user._id)
        const pieces = token.split('.')
        const encodedToken = pieces.join('-')

        const link = `http://localhost:5173/reset-password/${user._id}/${encodedToken}`
 
        console.log(link) // send to email

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

export const userResetPassword = async (req: Request, res: Response) => {
    const {id, username, email, password } = req.body;

    console.log(id, username, email, password)

    try {
        const user = await User.resetPassword(id, username, email, password)
        // res.status(200).json(user)
        console.log('Reset hasła', password)

    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}