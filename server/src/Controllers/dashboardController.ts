import { Request, Response } from 'express'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})
}

export const dashboard = (req: Request, res: Response) => {

}

export const discordLogin = (req: Request, res: Response) => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1153269554210951208&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdashboard%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify'

    res.redirect(url)
}

export const discordCallback = async (req: Request, res: Response) => {

    try {
        const { code } = req.query;
        console.log(code)

        if(!code) {
            throw Error('Brakujący kod')
        }

        const paramsObject = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
          };
          
          const params = new URLSearchParams(paramsObject as Record<string, string>);

          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded'
          };
         

          const response = await axios.post(
            'https://discord.com/api/oauth2/token',
            params,
            {
              headers
            }
          );

          const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
              ...headers
            }
          });

          const { id, username, avatar } = userResponse.data

          const token = createToken(id, '3d')

          res.cookie('discordToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });

          res.redirect('http://localhost:5173/dashboard/profile'); 

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}