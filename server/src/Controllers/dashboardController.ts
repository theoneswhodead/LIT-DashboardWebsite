import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const createToken = (_id: object, time: string) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: time})

}
  export const steamLogin = (req: Request, res: Response) => {
 
  }
  
  export const steamCallback = (req: Request, res: Response) => {
    if (req.user) {
  
      const steamId = req.user.id

      const { id, displayName, photos }:any = req.user

      const token = createToken(steamId, '3d')
  
      res.cookie('steamToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });
       
       res.redirect('http://localhost:5173/dashboard/profile');
    } else {
       
       console.log('Błąd uwierzytelnienia Steam');
       res.redirect('http://localhost:5173/dashboard/profile');
    }
  }

  export const discordCallback = async (req: Request, res: Response) => {

    try {
        const { code } = req.query;

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

          const { id, username, global_name, avatar } = userResponse.data

          const token = createToken(id, '3d')

          res.cookie('discordToken', token, { maxAge: 3 * 24 * 60 * 60 * 1000 });

          res.redirect('http://localhost:5173/dashboard/profile'); 

        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}