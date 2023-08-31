import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

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

    console.log(username, email, password);

    try {
        res.status(200).json({username, email})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}