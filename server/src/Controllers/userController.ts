import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const createToken = (_id: object) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        console.log(email, password)
        res.status(200).json({email, password})

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